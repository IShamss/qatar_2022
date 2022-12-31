const express = require("express");
const User = require("../models/User.js");
const router = express.Router();

router.get("/users/list", async (req, res) => {
    try {
        const users = await User.find({});
        if (users) {
            res.status(200).send({
                users: users,
            });
        } else {
            res.status(404).send({
                message: "No users found.",
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Server error.",
        });
    }
});

module.exports = router;
