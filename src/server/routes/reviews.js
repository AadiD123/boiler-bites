const express = require("express");
const {
  createReview,
  getRatings,
  getReview,
  deleteReview,
  updateReview,
} = require("../controllers/ratingController");

const router = express.Router();

// GET all reviews
router.get("/", getRatings);

// GET single review
router.get("/:id", getReview);

// POST a review
router.post("/", createReview);

// DELETE a review
router.delete("/:id", deleteReview);

// UPDATE a review
router.patch("/:id", updateReview);

module.exports = router;
