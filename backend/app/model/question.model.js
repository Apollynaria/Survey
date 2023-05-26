module.exports = (sequelize, Sequelize) => {
    var Question = sequelize.define(
        'question', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            survey_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            text: {
                type: Sequelize.STRING(1000),  // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            type: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            }
        });

    Question.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        Question.belongsTo(models.survey, {
            foreignKey: 'survey_id'
        });


        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        Question.hasMany(models.answer, {
            foreignKey: 'question_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Question;
};