module.exports = (sequelize, DataTypes) => {
    return sequelize.define('playerScore', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        playerId: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        quizzId: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        playerScore: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        quizzTotalScore: {
            type: DataTypes.INTEGER(20),
            allowNull: false
        },
        // playerAwnsers: {
        //     type: DataTypes.TEXT('long'),
        //     get: function() {
        //         return JSON.parse(this.getDataValue('playerAwnsers'));
        //     },
        //     set: function(value) {
        //         this.setDataValue('playerAwnsers', JSON.stringify(value));
        //     },
        // },
        certificate: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        }
    }, {
        tableName: "playerScore"
    })
}