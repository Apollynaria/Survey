module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(50),  // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            login: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        });

        User.associate = (models) => {
            // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
            // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
            User.hasMany(models.user_answer, {
                foreignKey: 'user_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                sourceKey: 'id'
            });
        };
        return User;
};