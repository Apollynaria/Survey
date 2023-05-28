module.exports = (app) => {

    const userAnswer = require('../controller/user_answer.controller');

    // app.get('/api/surveys', userAnswer.findAll);

    app.post('/api/addUserAnswers', userAnswer.create);

    // app.get('/api/survey/:id', userAnswer.findById);

};