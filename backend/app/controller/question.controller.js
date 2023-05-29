var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
const { Op } = require('sequelize');

var Question = db.question;

exports.findBySurvey = (req, res) => {
    Question.findAll({
        where: {
            survey_id: req.params.id
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};
