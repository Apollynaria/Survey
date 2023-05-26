module.exports = (sequelize, Sequelize) => {
    var Survey = sequelize.define(
        'survey', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10), // тип данных INTEGER
                autoIncrement: true, // включение автоматической нумерации
                primaryKey: true, // поле является первичным ключом
                allowNull: false // настройка allowNull со значением false запрещает запись в поле значений NULL (для поля с настройкой автоинкремента можно не указывать)
            },
            name: {
                type: Sequelize.STRING(100),  // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            }
        });

    Survey.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user_category. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user_category): в файле user_category.model.js
        Survey.hasMany(models.question, {
            foreignKey: 'survey_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Survey;
};