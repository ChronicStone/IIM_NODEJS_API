module.exports = (sequelize, DataTypes) => {
    return sequelize.define('account', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        tableName: "account"
    })
}