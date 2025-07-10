import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.model.js";
import Store from "./store.model.js";

const Rating = sequelize.define("Rating", {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
});

User.hasMany(Rating);
Rating.belongsTo(User);

Store.hasMany(Rating);
Rating.belongsTo(Store);

export default Rating;
