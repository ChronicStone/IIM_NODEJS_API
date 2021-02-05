module.exports = (sequelize, DataTypes) => {
    return sequelize.define('awnser', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        questionId: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        awnserInput: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isCorrectAwnser: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: "awnser"
    })
}