var { authJwt } = require("../middleware");

module.exports = (app) => {

    const survey = require('../controller/survey.controller');

    app.get('/api/surveys', [authJwt.verifyToken], survey.findAll);

    app.post('/api/addSurvey', [authJwt.check], survey.create);

    app.post('/api/updateSurvey/:id', [authJwt.check], survey.update);

    app.post('/api/deleteSurvey/:id', [authJwt.check], survey.delete);

    app.get('/api/survey/:id', [authJwt.verifyToken], survey.findById);

    const ExcelJS = require('exceljs');

    app.post('/api/saveFile', [authJwt.check], (req, res) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        // Добавляем данные в лист
        const data = req.body;

        for (let i = 0; i < data[0].length; i++) {
            var arr = []
            for (let j = 0; j < data.length; j++) {
                arr.push(data[j][i])
            }
            worksheet.addRow(arr);
        }

        // Сохраняем файл
        workbook.xlsx.writeFile('report.xlsx')
            .then(() => {
                console.log('Файл успешно сохранен');
                // res.send('Файл успешно сохранен');
                const filePath = 'report.xlsx'; // Путь к файлу на сервере
                res.download(filePath); // Отправляем файл клиенту
            })
            .catch((error) => {
                console.log(`Ошибка при сохранении файла: ${error.message}`);
                res.status(500).send(`Ошибка при сохранении файла: ${error.message}`);
            });
    });

    app.get('/api/downloadFile', [authJwt.check], (req, res) => {
        const filePath = 'report.xlsx'; // Путь к файлу на сервере
        res.download(filePath); // Отправляем файл клиенту
    });

};