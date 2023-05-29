var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
const { Op } = require('sequelize');

var UserAnswer = db.user_answer;
var User = db.user;
var Answer = db.answer;

exports.create = (req, res) => {
    let userAnswers = req.body.map((answer) => ({
        user_id: answer.id_user,
        answer_id: answer.id_answer,
        answer: answer.ans
    }));

    UserAnswer.bulkCreate(userAnswers)
        .then(() => {
            globalFunctions.sendResult(res, { message: 'Записи успешно добавлены' });
        })
        .catch((err) => {
            globalFunctions.sendError(res, err);
        });
};

exports.findAllAnswersByQuestion = (req, res) => {
    UserAnswer.findAll({
        attributes:['answer'],
        include: [
            {
                model: User,
                attributes:['name', 'login']
            },
            {
                model: Answer,
                as: 'userAnswerAnswer',
                attributes:['txt'],
                where: {question_id : req.params.id}
            }
        ]
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
}