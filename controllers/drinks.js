const {
  // HttpError,
  ctrlWrapper,
} = require("../helpers");
const { Drink } = require("../models/drinks");
const listDrink = async (req, res) => {
  // checking age +18
  const data = await Drink.find();
  res.json(data);
};

module.exports = {
  listDrink: ctrlWrapper(listDrink),
};
