const express = require("express");
const User = require("../models/User.js");
const router = express.Router();

router.get("/users/", async (req, res) => {
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
        res.status(200).send({
            message: "User removed.",
        });
    } catch (error) {
        res.status(500).send({
            message: "Server error.",
        });
    }
});

router.delete("/user/:id", async (req, res) => {
    try {
        const username = req.params.id;
        const user = await User.findByIdAndDelete();
        if (!user) {
            return res.status(404).send({
                message: "User not found.",
            });
        }
        res.status(200).send({
            message: "User removed.",
        });
    } catch (error) {
        res.status(500).send({
            message: error.toString(),
        });
    }
});

module.exports = router;
