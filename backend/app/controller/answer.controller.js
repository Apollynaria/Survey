module.exports = (sequelize, Sequelize) => {
    var Answer = sequelize.define(
        'answer', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            question_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            answer: {
                type: Sequelize.STRING(1000),  // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            }
        });

    Answer.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        Answer.belongsTo(models.question, {
            foreignKey: 'question_id'
        });

        Answer.hasMany(models.user_answer, {
            foreignKey: 'answer_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Answer;
};