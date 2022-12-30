const express = require("express");
const User = require("../models/User.js");
const router = express.Router();

checkConflict = async function (user_name) {
    const user = await User.findOne({ user_name: user_name });
    if (user) {
        return true;
    }
    return false;
};
router.post("/auth/signup", async (req, res) => {
    try {
        const user = new User(req.body);

        if (!(await User.checkConflict(user.email, user.username))) {
            const saved_user = await user.save();
            if (!saved_user) {
                return res.status(400).send({ error: "User not saved" });
            }
            const userObj = await User.generateUserObject(saved_user);
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
