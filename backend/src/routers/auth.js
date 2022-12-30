const express = require("express");
const User = require("../models/User.js");
const router = express.Router();

checkConflict = async function (user) {
    const existing_user = await User.findOne({ user_name: user.user_name });
    if (existing_user) {
        return true;
    }
    return false;
};

generateUserObject = async function (user) {
    try {
        const userObj = {
            user_name: user.user_name,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            gender: user.gender,
            nationality: user.nationality,
            email_address: user.email_address,
            role: user.role
        };
        return userObj;
    } catch (error) {
        return null;
    }
}
router.post("/auth/signup", async (req, res) => {
    try {
        const user = new User(req.body);

        if (!(await checkConflict(user))) {
            const saved_user = await user.save();
            if (!saved_user) {
                return res.status(400).send({ error: "User not saved" });
            }
            const userObj = await generateUserObject(saved_user);
            res.status(200).send({
                user: userObj,
                message: "User Signed up successfully",
            });
        } else {
            res.status(409).send({ message: "User already exists" });
        }
    } catch (err) {
        if (err.name == "ValidationError") {
            res.status(400).send(err.toString());
        } else {
            res.status(500).send(err.toString());
        }
    }
});
module.exports = router;
