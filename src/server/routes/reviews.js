const express = require("express");
const {
  createReview,
  getReviews,
  getReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");

const router = express.Router();

// GET all reviews
router.get("/", getReviews);

// GET single review
router.get("/:id", getReview);

// POST a review
router.post("/", createReview);

// DELETE a review
router.delete("/:id", deleteReview);

// UPDATE a review
router.patch("/:id", updateReview);

module.exports = router;
