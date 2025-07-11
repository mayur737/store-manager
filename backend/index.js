import dotenv from "dotenv";
import sequelize from "./config/db.js";
import app from "./app.js";
import cors from "cors";
import { createAdminIfNotExists } from "./models/User.model.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .then(createAdminIfNotExists)
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
