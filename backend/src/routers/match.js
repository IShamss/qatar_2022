const express = require("express");
const Team = require("../models/Team");
const Match = require("../models/Match");
const Stadium = require("../models/Stadium");
const router = express.Router();


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
            res.status(200).send({
                match: match,
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

router.get("/match/:id", async (req, res) => {
    try {
        const match = await Match.findById(req.params.id)
        if (match) {
            res.status(200).send({
                match: match
            });
        } else {
            res.status(404).send({
                message: "Match not found.",
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

router.get("/match/info/:id", async (req, res) => {
    try {
        const match = await Match.findById(req.params.id)
        if (match) {
            const team1 = await Team.findById(match.team1);
            const team2 = await Team.findById(match.team2)
            const stadium = await Stadium.findById(match.stadium)
            const match_object = {
                team1_name: team1.name,
                team2_name: team2.name,
                stadium_name: stadium.name,
                main_referee: match.main_referee,
                line_man_1: match.line_man_1,
                line_man_2: match.line_man_2,
                date: match.date,
            };
            res.status(200).send({
                match: match_object
            });
        } else {
            res.status(404).send({
                message: "Match not found.",
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

router.patch("/match/:id", async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        const updates = Object.keys(req.body);
        const allowed_updates = [
            "team1",
            "team2",
            "stadium",
            "main_referee",
            "line_man_1",
            "line_man_2",
            "date"
        ];
        const is_valid_update = updates.every((update) =>
            allowed_updates.includes(update)
        );
        if (!is_valid_update) {
            return res.status(400).send({
                message: "Invalid Update: You can't update this field!",
            });
        }
        const edit_match = new Match(req.body);
        const edit_team1 = await Team.findById(edit_match.team1)
        if (!edit_team1) {
            return res.status(404).send({
                message: "Team1 not found.",
            });
        }
        const edit_team2 = await Team.findById(edit_match.team2);
        if (!edit_team2) {
            return res.status(404).send({
                message: "Team2 not found.",
            });
        }
        if (edit_team1.name == edit_team2.name) {
            return res.status(409).send({
                message: "Team1 and Team2 are the same",
            });

        }
        const existing_match_team1 = await Match.find({
            $or: [{ team1: edit_team1.team1 }, { team2: edit_team1.team1 }]
        });
        const existing_match_team2 = await Match.find({
            $or: [{ team1: edit_team1.team2 }, { edit_team1: match.team2 }]
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
        const matches_on_stadium = await Match.find({
            stadium: edit_match.stadium,
        })
        if (matches_on_stadium) {
            for (let i = 0; i < matches_on_stadium.length; i++) {
                if (
                    matches_on_stadium[i].date.getFullYear() == edit_match.date.getFullYear() &&
                    matches_on_stadium[i].date.getMonth() == edit_match.date.getMonth() &&
                    matches_on_stadium[i].date.getDate() == edit_match.date.getDate()
                ) {
                    let hours = Math.abs((matches_on_stadium[i].date.getTime() - edit_match.date.getTime()) / 3600000);
                    if (hours < 3) {
                        return res.status(409).send({
                            message: "Stadium has another match! 3 hours should be betweed matches!!!",
                            hours: hours,
                        });
                    }
                }
            }
        }
            const update_match = await Match.findOneAndUpdate(match, req.body, {
                new: true,
                runValidators: true,
            });
            if (!update_match) {
                return res.status(400).send({ message: "Validation error" });
            }
            return res.status(200).send({
                message: "Match Updated.",
                match: await Match.findById(req.params.id),
            });
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
