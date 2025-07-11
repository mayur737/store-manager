import Store from "../models/store.model.js";
import Rating from "../models/rating.model.js";

export const createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    await Store.create({ name, email, address });
    res.status(201).json({ data: { msg: "Store created succesfully" } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll();

    const data = await Promise.all(
      stores.map(async (store) => {
        const ratings = await Rating.findAll({ where: { StoreId: store.id } });
        const avg =
          ratings.reduce((sum, r) => sum + r.rating, 0) / (ratings.length || 1);

        return {
          ...store.toJSON(),
          avgRating: avg.toFixed(2),
        };
      })
    );

    res.status(200).json({ data: { stores: data } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
