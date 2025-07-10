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

    res.json({ msg: "Password updated" });
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
          const ratings = await Rating.findAll({
            include: [{ model: Store, where: { userId: user.id } }],
          });
          avgRating =
            ratings.reduce((acc, r) => acc + r.rating, 0) /
            (ratings.length || 1);
        }
        return { ...user.toJSON(), avgRating };
      })
    );

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      address,
      password: hashed,
      role,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
