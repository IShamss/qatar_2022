const mongoose = require("mongoose");
const validator = require("validator");

const Team = mongoose.model("Team", {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
});

module.exports = Team;
