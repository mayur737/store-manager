import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      len: [20, 60],
    },
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: DataTypes.STRING(400),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("ADMIN", "USER", "OWNER"),
    defaultValue: "USER",
  },
});

export const createAdminIfNotExists = async () => {
  try {
    const existingAdmin = await User.findOne({ where: { role: "ADMIN" } });

    if (!existingAdmin) {
      const bcrypt = await import("bcrypt");
      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      await User.create({
        name: "Default System Administrator",
        email: "admin@example.com",
        address: "Admin Headquarters",
        password: hashedPassword,
        role: "ADMIN",
      });

      console.log("✅ Default admin user created.");
    } else {
      console.log("ℹ️ Admin user already exists.");
    }
  } catch (err) {
    console.error("❌ Error creating admin user:", err);
  }
};

export default User;
