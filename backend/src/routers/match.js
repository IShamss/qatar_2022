const express = require("express");
const Team = require("../models/Team")
const Match = require("../models/Match");
const router = express.Router();

generateMatchObject = async function (match) {
    try {
        const match_object = {
            team1: match.team1,
            team2: match.team2,
            stadium: match.stadium,
            main_referee: match.main_referee,
            line_man_1: match.line_man_1,
            line_man_2: match.line_man_2,
            date: match.date
        };
        return match_object;
    } catch (error) {
        return null;
    }
};

router.post("/match", async (req, res) => {
    try {
        const match = new Match(req.body);
        const team1 = await Team.findById(match.team1)
        if (!team1) {
            return res.status(404).send({
                message: "Team1 not found"
            });
        }
        const team2 = await Team.findById(match.team2)
        if (!team2) {
            return res.status(404).send({
                message: "Team2 not found"
            });
        }
        if (team1.name == team2.name) {
            return res.status(409).send({
                message: "Team1 and Team2 are the same"
            });
        }
        const existing_match_team1 = await Match.findOne({
            $or: [
                { team1: match.team1 },
                { team2: match.team1 },
            ],
            date: match.date
        });
        const existing_match_team2 = await Match.findOne({
            $or: [
                { team1: match.team2 },
                { team2: match.team2 },
            ],
            date: match.date
        });
        if (existing_match_team1) {
            return res.status(409).send({
                message: "Team1 has another match on the same day"
            });
        }
        if (existing_match_team2) {
            return res.status(409).send({
                message: "Team2 has another match on the same day"
            });
        }
        const existing_match = await Match.findOne({ match });
        if (!existing_match) {
            const saved_match = await match.save();
            if (!saved_match) {
                return res.status(400).send({ error: "Match not saved" });
            }
            const match_object = await generateMatchObject(saved_match);
            res.status(200).send({
                user: match_object,
                message: "Match Created successfully.",
            });
        } else {
            res.status(409).send({ message: "Match already exists." });
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

router.get("/matches", async (req, res) => {
    try {
        const teams = await Match.find({});
        if (teams) {
            res.status(200).send({
                teams: teams,
            });
        } else {
            res.status(404).send({
                message: "No Mathces found.",
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
