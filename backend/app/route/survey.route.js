module.exports = (app) => {

    const survey = require('../controller/survey.controller');

    app.get('/api/surveys', survey.findAll);

    app.post('/api/addSurvey', survey.create);

    app.post('/api/updateSurvey/:id', survey.update);

    app.post('/api/deleteSurvey/:id', survey.delete);

    app.get('/api/survey/:id', survey.findById);

    // app.get('/api/survey/surveyname/:surveyname', survey.findBySurvayname);
};