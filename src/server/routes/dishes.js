const express = require("express");
const {
  createDish,
  getDishes,
  getDish,
  //getDCDishes,
  deleteDish,
  updateDish,
} = require("../controllers/dishController");

const router = express.Router();

// GET single dish by dining court
//router.get("/:diningCourt", getDCDishes);

// GET single dish by ID
router.get("/:id", getDish);

// GET all dishes
router.get("/", getDishes);

// POST a dish
router.post("/", createDish);

// DELETE a dish
router.delete("/:id", deleteDish);

// UPDATE a dish
router.patch("/:id", updateDish);

module.exports = router;
