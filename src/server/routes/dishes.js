const express = require("express");
const {
  createDish,
  getDishes,
  getDish,
  deleteDish,
  updateDish,
} = require("../controllers/dishController");

const router = express.Router();

// GET all reviews
router.get("/", getDishes);

// GET single review
router.get("/:id", getDish);

// POST a review
router.post("/", createDish);

// DELETE a review
router.delete("/:id", deleteDish);

// UPDATE a review
router.patch("/:id", updateDish);

module.exports = router;
