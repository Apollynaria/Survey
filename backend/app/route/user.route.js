var { authJwt } = require("../middleware");

module.exports = (app) => {

    const user = require('../controller/user.controller');

    // Получение всех пользователей
    app.get('/api/users', [authJwt.verifyToken], user.findAll);

    // Добавление пользователя
    app.post('/api/addUser', user.create);

    // Обновление данных пользователя по id
    app.post('/api/updateUser/:id', user.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteUser/:id', user.delete);

    // Получение пользователя по id
    app.get('/api/user/:id', user.findById);

    // Получение пользователя по login
    app.get('/api/user/login/:login', user.findByUsername);
};