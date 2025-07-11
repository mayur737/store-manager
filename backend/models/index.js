import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../config/db.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: console.log,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.model.js")(sequelize, DataTypes);
db.store = require("./store.model.js")(sequelize, DataTypes);
db.rating = require("./rating.model.js")(sequelize, DataTypes);

db.user.hasMany(db.store, { foreignKey: "userId" });
db.store.belongsTo(db.user, { foreignKey: "userId" });

db.store.hasMany(db.rating, { foreignKey: "storeId" });
db.rating.belongsTo(db.store, { foreignKey: "storeId" });

db.user.hasMany(db.rating, { foreignKey: "userId" });
db.rating.belongsTo(db.user, { foreignKey: "userId" });

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ DB connection established successfully.");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Models synced with DB.");
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });

module.exports = db;
