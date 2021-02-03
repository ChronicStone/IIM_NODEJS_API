module.exports = (sequelize, DataTypes) => {
    return sequelize.define('chapters', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        license_id: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        chapter_number: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: "chapters"
    })
}