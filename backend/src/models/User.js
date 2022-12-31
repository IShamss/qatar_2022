const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
    user_name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    birth_date: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
    },
    email_address: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true,
    },
    to_be_a_manager: {
        type: Boolean,
        required: true,
    },
});

module.exports = User;
