const mongoose = require("mongoose");
const validator = require("validator");

const Stadium = mongoose.model("Stadium", {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
});

module.exports = Stadium;
