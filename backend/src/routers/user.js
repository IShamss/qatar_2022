const express = require("express");
const User = require("../models/User.js");
const router = express.Router();

router.patch("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const updates = Object.keys(req.body);
        const allowed_updates = [
            "password",
            "first_name",
            "last_name",
            "birth_date",
            "gender",
            "nationality",
        ];
        const is_valid_update = updates.every((update) =>
            allowed_updates.includes(update)
        );
        if (!is_valid_update) {
            return res.status(400).send({
                message: "Invalid Update: You can't update username or email!",
            });
        }
        const update_user = await User.findOneAndUpdate(user, req.body, {
            runValidators: true,
        });
        if (!update_user) {
            return res.status(400).send({ message: "Validation error" });
        }
        return res.status(200).send({
            message: "User Updated.",
            user: update_user,
        });
    } catch (error) {
        res.status(500).send({
            message: "Server error.",
        });
    }
});

module.exports = router;
