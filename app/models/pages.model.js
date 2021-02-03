module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pages', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        chapter_id: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        page_number: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        file_path: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        }
    }, {
        tableName: "pages"
    })
}