const express = require("express");
const User = require("../models/User.js");
const Match = require("../models/Match");
const Reservation = require("../models/Reservation");
const Stadium = require("../models/Stadium");
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
        const update_user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!update_user) {
            return res.status(400).send({ message: "Validation error" });
        }
        return res.status(200).send({
            message: "User Updated.",
            user: await User.findById(req.params.id),
        });
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

router.post("/reservation", async (req, res) => {
    try {
        const match_id = req.body.match;
        const user_id = req.body.user;
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
            });
        }
        const match = await Match.findById(match_id);
        if (!match) {
            return res.status(404).send({
                message: "Match not found.",
            });
        }

        const reservaions = await Reservation.find({
            match: match_id,
        });
        const stadium = await Stadium.findById(match.stadium);
        if (!stadium) {
            return res.status(404).send({
                message: "Stadium not found.",
            });
        }
        const stadium_places = stadium.length * stadium.width;
        const reserved_list = [];
        const vacant_list = [];
        if (reservaions) {
            for (let i = 0; i < reservaions.length; i++) {
                reserved_list.push(reservaions[i].place);
            }
            for (let i = 1; i <= stadium_places; i++) {
                if (!reserved_list.includes(i)) {
                    vacant_list.push(i);
                }
            }
        } else {
            for (let i = 1; i <= stadium_places; i++) {
                vacant_list.push(i);
            }
        }
        const tickets = req.body.places;
        if (!tickets) {
            return res.status(400).send({
                message: "Tickets not found.",
            });
        } else {
            for (let i = 0; i < tickets.length; i++) {
                const ticket = tickets[i];
                if (reserved_list.includes(ticket)) {
                    return res.status(400).send({
                        message: "Ticket is reserved: " + ticket,
                    });
                }
            }
        }
        for (let i = 0; i < tickets.length; i++) {
            const reservation = new Reservation({
                match: match_id,
                user: user_id,
                place: tickets[i],
            });
            const saved_reservation = await reservation.save();
            if (!saved_reservation) {
                return res.status(400).send({
                    message: "Reservation saving failed.",
                });
            }
        }
        res.status(200).send({
            message: "Reservation created.",
            reservation: await Reservation.find({
                user: user_id,
            }),
        });
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

router.delete("/reservation/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const reservation = await Reservation.findByIdAndDelete(id);
        if (!reservation) {
            return res.status(404).send({
                message: "reservation not found.",
            });
        }
        const match = await Match.findById(reservation.match);
        if (!match) {
            await reservation.save();
            return res.status(404).send({
                message: "match not found.",
            });
        }

        const match_date = match.date;
        var today = new Date();
        var difference_in_time_swap = today.getTime() - match_date.getTime();
        if (difference_in_time_swap > 0) {
            await reservation.save();
            return res.status(409).send({
                message: "Cannot cancel past matches",
            });
        }

        var difference_in_time = match_date.getTime() - today.getTime();
        if (difference_in_time < 259200000) {
            await reservation.save();
            return res.status(409).send({
                message: "Cannot cancel reservation! too late",
            });
        }
        const reservations = await Reservation.find({
            user: reservation.user,
        });
        res.status(200).send({
            message: "reservaion caceled",
            reservations: reservations,
        });
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

router.get("/reservations", async (req, res) => {
    try {
        const reservaions = await Reservation.find({});
        if (reservaions) {
            res.status(200).send({
                reservaions: reservaions,
            });
        } else {
            res.status(404).send({
                message: "No Reservations found.",
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

router.get("/reservations/:id", async (req, res) => {
    try {
        const user_id = req.params.id;
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send({
                message: "User not found.",
            });
        }

        const reservaions = await Reservation.find({
            user: user_id,
        });
        if (reservaions) {
            res.status(200).send({
                reservaions: reservaions,
            });
        } else {
            res.status(200).send({
                reservaions: [],
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

router.get("/reservations_No/:id", async (req, res) => {
    try {
        const user_id = req.params.id;
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send({
                message: "User not found.",
            });
        }

        const reservaions = await Reservation.countDocuments({
            user: user_id,
        });

        if (reservaions) {
            res.status(200).send({
                reservaions_No: reservaions,
            });
        } else {
            res.status(200).send({
                reservaions_No: 0,
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
