var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Question = db.question;
var Survey = db.survey;

exports.findQuestionsForSurvey = (req, res) => {
    Question.findAll({
        include: [
            {
                model: Survey,
                required: true, // INNER JOIN
            }
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};