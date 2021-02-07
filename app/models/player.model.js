module.exports = (sequelize, DataTypes) => {
    return sequelize.define('player', {
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
            type: DataTypes.STRING(255),
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            defaultValue: 'avatar/default.png'
        }
    }, {
        tableName: "player"
    })
}