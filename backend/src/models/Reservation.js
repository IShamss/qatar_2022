const mongoose = require("mongoose");
const validator = require("validator");

const Reservation = mongoose.model("Reservation", {
    match: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    place: {
        type: Number,
        required: true,
    },
});

module.exports = Reservation;
