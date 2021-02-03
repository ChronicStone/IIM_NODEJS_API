module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comments', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        license_id: {
            type: DataTypes.INTEGER(20),
            allowNull: true
        },
        chapter_id: {
            type: DataTypes.INTEGER(20),
            allowNull: true
        },
        account_id: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: "comments"
    })
}