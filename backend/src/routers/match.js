const express = require("express");
const Team = require("../models/Team");
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
            date: match.date,
        };
        return match_object;
    } catch (error) {
        return null;
    }
};

router.post("/match", async (req, res) => {
    try {
        const match = new Match(req.body);
        const team1 = await Team.findById(match.team1);
        if (!team1) {
            return res.status(404).send({
                message: "Team1 not found",
            });
        }
        const team2 = await Team.findById(match.team2);
        if (!team2) {
            return res.status(404).send({
                message: "Team2 not found",
            });
        }
        if (team1.name == team2.name) {
            return res.status(409).send({
                message: "Team1 and Team2 are the same",
            });
        }
        const existing_match_team1 = await Match.find({
            $or: [{ team1: match.team1 }, { team2: match.team1 }]
        });
        const existing_match_team2 = await Match.find({
            $or: [{ team1: match.team2 }, { team2: match.team2 }]
        });
        if (existing_match_team1) {
            for (let i = 0; i < existing_match_team1.length; i++) {
                if (
                    existing_match_team1[i].date.getFullYear() == match.date.getFullYear() &&
                    existing_match_team1[i].date.getMonth() == match.date.getMonth() &&
                    existing_match_team1[i].date.getDate() == match.date.getDate()
                ) {
                    return res.status(409).send({
                        message: "Team1 has another match on the same day",
                    });
                }
            }
        }
        if (existing_match_team2) {
            for (let i = 0; i < existing_match_team2.length; i++) {
                if (
                    existing_match_team2[i].date.getFullYear() == match.date.getFullYear() &&
                    existing_match_team2[i].date.getMonth() == match.date.getMonth() &&
                    existing_match_team2[i].date.getDate() == match.date.getDate()
                ) {
                    return res.status(409).send({
                        message: "Team2 has another match on the same day",
                    });
                }
            }
        }
        const existing_match = await Match.findOne({
            team1: match.team1,
            team2: match.team2,
            stadium: match.stadium,
            main_referee: match.main_referee,
            line_man_1: match.line_man_1,
            line_man_2: match.line_man_2,
            date: match.date
        });
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
                message: "Validation error: " + error.message,
            });
        } else {
            res.status(500).send({
                message: "Server error: " + error.message,
            });
        }
    }
});

router.get("/matches", async (req, res) => {
    try {
        const matches = await Match.find({});
        if (matches) {
            res.status(200).send({
                matches: matches,
            });
        } else {
            res.status(404).send({
                message: "No Mathces found.",
            });
        }
    } catch (error) {
        if (error.name == "ValidationError") {
            res.status(400).send({
                message: "Validation error: " + error.message,
            });
        } else {
            res.status(500).send({
                message: "Server error: " + error.message,
            });
        }
    }
});

module.exports = router;
