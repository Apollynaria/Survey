    module.exports = (sequelize, Sequelize) => {
        var UserAnswer = sequelize.define(
            'user_answer', // определяем имя таблицы
            {
                id: {
                    type: Sequelize.INTEGER(10), // тип данных INTEGER
                    autoIncrement: true, // включение автоматической нумерации
                    primaryKey: true, // поле является первичным ключом
                    allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
                },
                user_id: {
                    type: Sequelize.INTEGER(10),
                    allowNull: false
                },
                answer_id: {
                    type: Sequelize.INTEGER(10),
                    allowNull: false
                },
                answer: {
                    type: Sequelize.STRING(1000),  // тип данных STRING (в MySQL — VARCHAR)
                    allowNull: false
                }
            });

        UserAnswer.associate = (models) => {
            // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
            // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
            UserAnswer.belongsTo(models.user, {
                foreignKey: 'user_id'
            });

            UserAnswer.belongsTo(models.answer, {
                as: 'userAnswerAnswer',
                foreignKey: 'answer_id'
            });
        };
        return UserAnswer;
    };