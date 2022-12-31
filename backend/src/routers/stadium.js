const express = require("express");
const Stadium = require("../models/Stadium")
const router = express.Router();

checkConflict = async function (stadium_name) {
    const existing_stadium = await Stadium.findOne({ name: stadium_name });
    if (existing_stadium) {
        return true;
    }
    return false;
};

generateMatchObject = async function (stadium) {
    try {
        const stadium_object = {
            name: stadium.name,
            length: stadium.length,
            width: stadium.width
        };
        return stadium_object;
    } catch (error) {
        return null;
    }
};

router.post("/stadium", async (req, res) => {
    try {
        const stadium = new Stadium(req.body);
        if (!(await checkConflict(stadium.name))) {
            const saved_stadium = await stadium.save();
            if (!saved_stadium) {
                return res.status(400).send({ error: "Stadium not saved" });
            }
            const stadium_object = await generateStadiumObject(saved_stadium);
            res.status(200).send({
                stadium: stadium_object,
                message: "Stadium added successfully",
            });
        } else {
            res.status(409).send({ message: "Stadium already exists" });
        }
    } catch (error) {
        if (error.name == "ValidationError") {
            res.status(400).send(error.toString());
        } else {
            res.status(500).send({
                message: "Server error: " + error.message
            });
        }
    }
});

module.exports = router;
