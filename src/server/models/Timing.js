const mongoose = require('mongoose');

const timingSchema = new mongoose.Schema({
    diningCourt: { type: String, required: true },
    station: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    meal: { type: String, required: true },
    dishes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true }
    ]
}, { timestamps: true });

const Timing = mongoose.model('Timing', timingSchema);

module.exports = Timing;