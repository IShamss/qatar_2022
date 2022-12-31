const express = require("express");
const User = require("../models/User.js");
const router = express.Router();

checkConflict = async function (username) {
    const existing_user = await User.findOne({ user_name: username });
    if (existing_user) {
        return true;
    }
    return false;
};

generateUserObject = async function (user) {
    try {
        const user_object = {
            user_name: user.user_name,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            gender: user.gender,
            nationality: user.nationality,
            email_address: user.email_address,
            role: user.role,
        };
        return user_object;
    } catch (error) {
        return null;
    }
};

verifyCredentials = async function (username_email, password) {
    try {
        const user = await User.findOne({
            $or: [
                { email_address: username_email },
                { user_name: username_email },
            ],
        });
        if (user && password === user.password) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};

router.post("/auth/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        user.role = 1;

        if (!(await checkConflict(user.user_name))) {
            const saved_user = await user.save();
            if (!saved_user) {
                return res.status(400).send({ error: "User not saved" });
            }
            const user_object = await generateUserObject(saved_user);
            res.status(200).send({
                user: user_object,
                message: "User Signed up successfully",
            });
        } else {
            res.status(409).send({ message: "User already exists" });
        }
    } catch (error) {
        if (error.name == "ValidationError") {
            res.status(400).send({
                message: "Validation error: " + error.message
            });
        } else {
            res.status(500).send({
                message: "Server error: " + error.message
            });
        }
    }
});

router.post("/auth/signin", async (req, res) => {
    const user = await verifyCredentials(
        req.body.email_or_username,
        req.body.password
    );

    try {
        if (user) {
            const user_object = await generateUserObject(user);
            res.status(200).send({
                user: user_object,
                message: "User logged in successfully.",
            });
        } else {
            res.status(404).send({
                message: "User not found.",
            });
        }
    } catch (error) {
        if (error.name == "ValidationError") {
            res.status(400).send({
                message: "Validation error: " + error.message
            });
        } else {
            res.status(500).send({
                message: "Server error: " + error.message
            });
        }
    }
});

module.exports = router;
