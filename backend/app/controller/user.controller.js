var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var User = db.user;

// Получение всех пользователей
exports.findAll = (req, res) => {
    User.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Добавление пользователя
exports.create = (req, res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Обновление данных пользователя по id
exports.update = (req, res) => {
    User.update({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

// Удаление пользователя по id
exports.delete = (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

// Получение данных пользователя по id
exports.findById = (req, res) => {
    User.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

// Получение данных пользователя по username
exports.findByUsername = (req, res) => {
    User.findAll({
        where: {
            login: req.params.login
        }
    }).then(objects => {
        globalFunctions.sendResult(res, objects);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};