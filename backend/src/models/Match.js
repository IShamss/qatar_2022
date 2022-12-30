const mongoose = require("mongoose");
const validator = require("validator");

const Match = mongoose.model("Match", {
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    stadium: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    main_referee: {
        type: String,
        required: true,
        trim: true,
    },
    line_man_1: {
        type: String,
        required: true,
        trim: true,
    },
    line_man_2: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

module.exports = Match;
