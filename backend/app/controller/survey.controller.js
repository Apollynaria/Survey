var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
const { Op } = require('sequelize');

var Survey = db.survey;

exports.findAll = (req, res) => {
    Survey.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.update = (req, res) => {
    const surveyId = req.params.id;
    const { name } = req.body;

    // Обновляем название опроса
    db.survey.update({ name }, { where: { id: surveyId } })
        .then(() => {
            // Определяем список ID вопросов для этого опроса
            return db.question.findAll({ attributes: ['id'], where: { survey_id: surveyId } });
        })
        .then(questions => {
            // Преобразуем массив объектов в массив ID
            const questionIds = questions.map(q => q.id);

            // Удаляем все ответы для всех вопросов, связанных с этим опросом
            return db.answer.destroy({ where: { question_id: questionIds } });
        })
        .then(() => {
            // Удаляем все вопросы, связанные с этим опросом
            return db.question.destroy({ where: { survey_id: surveyId } });
        })
        .then(() => {
            // Создаем новые вопросы и ответы
            const questions = [];
            const answers = [];

            req.body.questions.forEach(questionInfo => {
                const question = {
                    survey_id: surveyId,
                    text: questionInfo.text,
                    type: questionInfo.type
                };
                questions.push(question);

                questionInfo.answers.forEach(answerInfo => {
                    const answer = {
                        question_id: null,
                        txt: answerInfo.txt
                    };
                    answers.push(answer);
                });
            });

            return db.sequelize.transaction(transaction => {
                // Создаем все вопросы
                return db.question.bulkCreate(questions, { transaction })
                    .then(createdQuestions => {
                        const updatedAnswers = [];
                        createdQuestions.forEach((createdQuestion, index) => {
                            const answerInfos = req.body.questions[index].answers;
                            answerInfos.forEach(answerInfo => {
                                const answer = {
                                    question_id: createdQuestion.id,
                                    txt: answerInfo.txt
                                };
                                updatedAnswers.push(answer);
                            });
                        });
                        // Создаем все варианты ответов
                        return db.answer.bulkCreate(updatedAnswers, { transaction });
                    });
            });
        })
        .then(() => {
            globalFunctions.sendResult(res, { message: 'Опрос успешно обновлен!' });
        })
        .catch(error => {
            globalFunctions.sendError(res, error);
        });
};

exports.create = (req, res) => {

    // Создаем новый опрос
    db.survey.create({
        name: req.body.name
    })
        .then(survey => {
            const questions = []; // Массив для хранения созданных вопросов
            // Проходимся по каждому элементу массива и создаем вопросы с вариантами ответов
            req.body.questions.forEach(questionInfo => {
                // Создаем новый вопрос
                const question = {
                    survey_id: survey.id,
                    text: questionInfo.text,
                    type: questionInfo.type
                };
                questions.push(question);


                const answers = []; // Массив для хранения созданных ответов

                // Создаем новые варианты ответов для вопроса
                questionInfo.answers.forEach(answerInfo => {
                    const answer = {
                        question_id: null, // заполнил позже
                        txt: answerInfo.txt
                    };
                    // console.log(answer)
                    answers.push(answer);
                });

                question.answers = answers;

            });
            // console.log(questions)

            // Создаем все вопросы в опросе одной транзакцией
            return db.sequelize.transaction(transaction => {
                // Создаем все вопросы
                return db.question.bulkCreate(questions, { transaction })
                    // Обновляем id вопросов в объектах вариантов ответов и создаем все варианты ответов для всех вопросов
                    .then(createdQuestions => {
                        const answers = []; // Массив для хранения созданных ответов 
                        // Проходимся по каждому созданному вопросу
                        createdQuestions.forEach((createdQuestion, index) => {
                            // Обновляем id вопроса во всех вариантах ответов для этого вопроса
                            const answerInfos = req.body.questions[index].answers;
                            console.log("YEEZ")
                            console.log(answerInfos);
                            answerInfos.forEach(answerInfo => {
                                const answer = {
                                    question_id: createdQuestion.id,
                                    txt: answerInfo.txt
                                };
                                answers.push(answer);
                            });
                        });
                        // Создаем все варианты ответов
                        return db.answer.bulkCreate(answers, { transaction });

                    });

            });

        })
        .then(() => {
            globalFunctions.sendResult(res, { message: 'Опрос успешно создан!' });
        })
        .catch(error => {
            globalFunctions.sendError(res, error);
        });
};



exports.delete = (req, res) => {
    const surveyId = req.params.id;

    // Удаляем все ответы для всех вопросов, связанных с этим опросом
    db.question.findAll({ attributes: ['id'], where: { survey_id: surveyId } })
        .then(questions => {
            // Преобразуем массив объектов в массив ID
            const questionIds = questions.map(q => q.id);

            return db.answer.destroy({ where: { question_id: questionIds } });
        })
        .then(() => {
            // Удаляем все вопросы, связанные с этим опросом
            return db.question.destroy({ where: { survey_id: surveyId } });
        })
        .then(() => {
            // Удаляем сам опрос
            return db.survey.destroy({ where: { id: surveyId } });
        })
        .then(() => {
            globalFunctions.sendResult(res, { message: 'Опрос успешно удален!' });
        })
        .catch(error => {
            globalFunctions.sendError(res, error);
        });
};

exports.findById = (req, res) => {
    // Получаем id опроса из параметров запроса
    const surveyId = req.params.id;

    // Находим опрос по id
    return db.survey.findByPk(surveyId, {
        include: [
            {
                model: db.question,
                as: 'questions',
                include: [
                    {
                        model: db.answer,
                        as: 'answers'
                    }
                ]
            }
        ]
    })
        .then(survey => {
            if (!survey) {
                throw new Error('Опрос не найден');
            }

            globalFunctions.sendResult(res, { survey });
        })
        .catch(error => {
            globalFunctions.sendError(res, error);
        });
};
