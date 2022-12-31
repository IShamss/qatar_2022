const express = require("express");
const Team = require("../models/Team");
const router = express.Router();

checkConflict = async function (team_name) {
    const existing_team = await Team.findOne({ name: team_name });
    if (existing_team) {
        return true;
    }
    return false;
};

generateTeamObject = async function (team) {
    try {
        const team_object = {
            name: team.name,
        };
        return team_object;
    } catch (error) {
        return null;
    }
};

router.post("/team", async (req, res) => {
    try {
        const team = new Team(req.body);

        if (!(await checkConflict(team.name))) {
            const saved_team = await team.save();
            if (!saved_team) {
                return res.status(400).send({ error: "Team not saved" });
            }
            const user_object = await generateTeamObject(saved_team);
            res.status(200).send({
                user: user_object,
                message: "Team Created successfully.",
            });
        } else {
            res.status(409).send({ message: "Team already exists." });
        }
    } catch (error) {
        res.status(500).send({
            message: "Server error."
        })
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
        res.status(500).send({
            message: "Server error.",
        });
    }
});

module.exports = router;
