const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.quizz = require("./quizz.model.js")(sequelize, Sequelize);
db.question = require("./question.model.js")(sequelize, Sequelize);
db.awnser = require("./awnser.model.js")(sequelize, Sequelize);
db.player = require("./player.model.js")(sequelize, Sequelize);
db. playerScore = require("./playerScore.model.js")(sequelize, Sequelize);


db.quizz.hasMany(db.question, { foreignKey: "quizzId", CONSTRAINT: false })
db.question.belongsTo(db.quizz, { foreignKey: "quizzId" })

db.question.hasMany(db.awnser, { foreignKey: "quizzId", CONSTRAINT: false })
db.awnser.belongsTo(db.question, { foreignKey: "quizzId" })

db.player.hasMany(db.playerScore, { foreignKey: "playerId", CONSTRAINT: false })
db.playerScore.belongsTo(db.player, { foreignKey: "playerId" })

db.player.hasMany(db.quizz, { foreignKey: "creatorPlayerId", CONSTRAINT: false })
db.quizz.belongsTo(db.player, { foreignKey: "creatorPlayerId" })

db.quizz.hasMany(db.playerScore, { foreignKey: "quizzId", CONSTRAINT: false })
db.playerScore.belongsTo(db.quizz, { foreignKey: "quizzId" })


module.exports = db;

