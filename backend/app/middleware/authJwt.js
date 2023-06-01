var jwt = require("jsonwebtoken");
var config = require("../config/auth.config.js");
var db = require('../config/db.config.js');
var User = db.user;

exports.verifyToken = (req, res, next) => {
    // считываем токен из переданных заголовков со стороны клиентского приложения
    let token = req.headers["x-access-token"]; 
    if (!token) {
         res.status(403).send({
            message: "Токен не предоставлен"
        });
        return;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: "Неверно введенный логин и/или пароль"
            });
            return;
        }
        req.userId = decoded.id;
        next();
    });
};

exports.check = (req, res, next) => {
    // считываем токен из переданных заголовков со стороны клиентского приложения
    let token = req.headers["x-access-token"];
    if (!token) {
        res.status(403).send({
            message: "Токен не предоставлен"
        });
        return;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: "Токен не предоставлен"
            });
            return;
        }
        req.userId = decoded.id;
        User.findOne({
            where: {
                id: req.userId
            }
        }).then(user => {
            if (!user.isAdmin) {
                res.status(400).send({
                    message: "Error"
                });
                return;
            }
            next();
        });
    });
};