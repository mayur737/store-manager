import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Rating from "../models/rating.model.js";
import Store from "../models/store.model.js";

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ msg: "Incorrect password" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ data: { msg: "Password updated" } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "address", "role"],
    });

    const formatted = await Promise.all(
      users.map(async (user) => {
        let avgRating = null;

        if (user.role === "OWNER") {
          const store = await Store.findOne({ where: { userId: user.id } });

          if (store) {
            const ratings = await Rating.findAll({
              where: { storeId: store.id },
            });

            if (ratings.length > 0) {
              avgRating =
                ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;
            }
          }
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
          role: user.role,
          avgRating,
        };
      })
    );

    res.status(200).json({ data: { users: formatted } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      address,
      password: hashed,
      role,
    });
    res.status(201).json({ data: { msg: "User created successfully" } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const stats = async (req, res) => {
  try {
    const userCount = await User.count();
    const storeCount = await Store.count();
    res.status(200).json({data:{ userCount, storeCount }});
  } catch (error) {
    res.status(500).json({ msg: err.message });
  }
};
