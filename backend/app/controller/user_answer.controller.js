var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
const { Op } = require('sequelize');

var UserAnswer = db.user_answer;

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