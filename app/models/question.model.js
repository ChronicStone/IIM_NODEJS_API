module.exports = (sequelize, DataTypes) => {
    return sequelize.define('question', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        quizzId: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        questionInput: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        tableName: 'question'
    })
}