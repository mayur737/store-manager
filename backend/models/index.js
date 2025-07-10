const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.model.js")(sequelize, DataTypes);
db.store = require("./store.model.js")(sequelize, DataTypes);
db.rating = require("./rating.model.js")(sequelize, DataTypes);

// Associations
db.store.hasMany(db.rating);
db.rating.belongsTo(db.store);

db.user.hasMany(db.rating);
db.rating.belongsTo(db.user);

db.sequelize.sync({ force: false }); // Use `true` if testing
module.exports = db;
