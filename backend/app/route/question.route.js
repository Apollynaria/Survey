var { authJwt } = require("../middleware");

module.exports = (app) => {

    const question = require('../controller/question.controller');

    app.get('/api/questionsForSurvey/:id', question.findBySurvey);

};