const express = require("express");
const {
  createDish,
  getDishes,
  getDCDishes,
  getDish,
  deleteDish,
  updateDish,
} = require("../controllers/dishController");

const router = express.Router();

// GET all reviews
router.get("/", getDishes);

router.get("/:diningCourt", getDCDishes);

// GET single dish
router.get("/:_id", getDish);

// POST a review
router.post("/", createDish);

// DELETE a review
router.delete("/:id", deleteDish);

// UPDATE a review
router.patch("/:id", updateDish);

module.exports = router;
