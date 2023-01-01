const express = require("express");
const Team = require("../models/Team");
const router = express.Router();

checkTeamConflict = async function (team_name) {
    const existing_team = await Team.findOne({ name: team_name });
    if (existing_team) {
        return true;
    }
    return false;
};

router.post("/team", async (req, res) => {
    try {
        const team = new Team(req.body);
        if (!(await checkTeamConflict(team.name))) {
            const saved_team = await team.save();
            if (!saved_team) {
                return res.status(400).send({ error: "Team not saved" });
            }
            res.status(200).send({
                team: team,
                message: "Team Created successfully.",
            });
        } else {
            res.status(409).send({ message: "Team already exists." });
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

router.get("/teams", async (req, res) => {
    try {
        const teams = await Team.find({});
        if (teams) {
            res.status(200).send({
                teams: teams,
            });
        } else {
            res.status(404).send({
                message: "No Teams found.",
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