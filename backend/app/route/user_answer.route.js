module.exports = (app) => {

    const userAnswer = require('../controller/user_answer.controller');


    app.post('/api/addUserAnswers', userAnswer.create);

    app.get('/api/findAllAnswersByQuestion/:id', userAnswer.findAllAnswersByQuestion)

};