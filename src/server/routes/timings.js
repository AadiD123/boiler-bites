const express = require("express");
module.exports = {
    createTiming,
    getTimings,
    getTiming,
    deleteTiming,
    updateTiming,
} = require("../controllers/timingController");

const router = express.Router();

// GET all reviews
router.get("/", getTimings);

// GET single review
router.get("/:id", getTiming);

// POST a review
router.post("/", createTiming);

// DELETE a review
router.delete("/:id", deleteTiming);

// UPDATE a review
router.patch("/:id", updateTiming);

module.exports = router;
