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

db.account = require("./accounts.model.js")(sequelize, Sequelize);
db.license = require("./licenses.model.js")(sequelize, Sequelize);
db.chapter = require("./chapters.model.js")(sequelize, Sequelize);
db.page = require('./pages.model.js')(sequelize, Sequelize);
db.comment = require('./comments.model.js')(sequelize, Sequelize);

db.license.hasMany(db.chapter, { foreignKey: "license_id", CONSTRAINT: false })
db.chapter.belongsTo(db.license, { foreignKey: "license_id" })

db.chapter.hasMany(db.page, { foreignKey: "chapter_id", CONSTRAINT: false })
db.page.belongsTo(db.chapter, { foreignKey: "chapter_id" })

db.license.hasMany(db.comment, {foreignKey: "license_id", CONSTRAINT: false})
db.comment.belongsTo(db.license, { foreignKey: "license_id" })

db.chapter.hasMany(db.comment, {foreignKey: "chapter_id", CONSTRAINT: false})
db.comment.belongsTo(db.chapter, { foreignKey: "chapter_id" })

module.exports = db;

