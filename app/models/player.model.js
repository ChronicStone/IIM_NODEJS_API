module.exports = (sequelize, DataTypes) => {
    return sequelize.define('quizz', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        password: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        }
    }, {
        tableName: "quizz"
    })
}