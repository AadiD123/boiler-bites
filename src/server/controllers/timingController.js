const Timing = require("../models/timing");
const mongoose = require("mongoose");

// get all timings
const getTimings = async (req, res) => {
  const timing = await Timing.find({}).sort({ createdAt: -1 });

  res.status(200).json(timing);
};

// get a single timing
const getTiming = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such timing" });
  }

  const timing = await Timing.findById(id);

  if (!timing) {
    return res.status(404).json({ error: "No such timing" });
  }

  res.status(200).json(timing);
};

const getTimingDishes = async (req, res) => {
  const { diningCourt, meal } = req.params;

  const dishes = await Timing.find({ diningCourt, meal }).sort({
    createdAt: -1,
  });

  if (!dishes) {
    return res.status(404).json({ error: "No dishes served at this time" });
  }

  res.status(200).json(dishes);
};

// create a review
const createTiming = async (req, res) => {
  const { diningCourt, year, month, day, meal, dishes } = req.body;

  // add to db

  try {
    const timing = await Timing.create({
      year,
      month,
      day,
      meal,
      dishes,
    });
    res.status(200).json(timing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a review
const deleteTiming = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such timing" });
  }

  const timing = await Timing.findOneAndDelete({ _id: id });

  if (!timing) {
    return res.status(404).json({ error: "No such timing" });
  }

  res.status(200).json(timing);
};

// update
const updateTiming = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such timing" });
  }

  const timing = await Timing.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!timing) {
    return res.status(404).json({ error: "No such timing" });
  }

  res.status(200).json(timing);
};

module.exports = {
  createTiming,
  getTimings,
  getTiming,
  deleteTiming,
  updateTiming,
  getTimingDishes,
};
