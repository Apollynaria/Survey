var { authJwt } = require("../middleware");

module.exports = (app) => {

    const userAnswer = require('../controller/user_answer.controller');

    app.post('/api/addUserAnswers', [authJwt.verifyToken], userAnswer.create);

    app.get('/api/findAllAnswersByQuestion/:id', [authJwt.check], userAnswer.findAllAnswersByQuestion)

};