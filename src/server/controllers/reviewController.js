const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

// get all reviews
const getReviews = async (req, res) => {
  const reviews = await Review.find({}).sort({ createdAt: -1 });

  res.status(200).json(reviews);
};

// get a single review
const getReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

// create a review
const createReview = async (req, res) => {
  const { nameOfFood, rating, diningCourt } = req.body;

  // add to db

  try {
    const review = await Review.create({
      nameOfFood,
      rating,
      diningCourt,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findOneAndDelete({ _id: id });

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

// update
const updateReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  const review = await Review.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!review) {
    return res.status(404).json({ error: "No such review" });
  }

  res.status(200).json(review);
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  deleteReview,
  updateReview,
};
