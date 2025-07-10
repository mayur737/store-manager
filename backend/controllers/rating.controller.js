import Rating from "../models/rating.model.js";

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const existing = await Rating.findOne({
      where: { UserId: req.user.id, StoreId: storeId },
    });

    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json({ msg: "Rating updated" });
    }

    await Rating.create({
      rating,
      UserId: req.user.id,
      StoreId: storeId,
    });

    res.status(201).json({ msg: "Rating submitted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getStoreRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({ where: { StoreId: req.params.id } });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
