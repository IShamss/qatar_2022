const mongoose = require("mongoose");
const validator = require("validator");

const Stadium = mongoose.model("Stadium", {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    length: {
        type: Number,
        required: true,
        trim: true,
        min: 1,
    },
    width: {
        type: Number,
        required: true,
        trim: true,
        min: 1,
    }
});

module.exports = Stadium;
