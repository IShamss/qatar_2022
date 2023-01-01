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
        const update_user = await User.findOneAndUpdate(user, req.body, {
            new: true,
            runValidators: true,
        });
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
                message: "Validation error: " + error.message
            });
        } else {
            res.status(500).send({
                message: "Server error: " + error.message
            });
        }
    }
});

router.post("/reservation", async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        const existing_reservation = await Reservation.findOne({
            match: reservation.match,
            user: reservation.user,
            place: reservation.place
        });
        if (existing_reservation) {
            return res.status(409).send({
                message: "Reservation already exists with the same data.",
            });
        }
        const all_reservations = await Reservation.find({
            match: reservation.match,
        });
        if (all_reservations) {
            const found_reservation = all_reservations.find(element => element.place == reservation.place);
            if (found_reservation) {
                return res.status(409).send({
                    message: "Reservation already exists for another user.",
                });
            }
        }
        const match = await Match.findById(reservation.match);
        if (!match) {
            return res.status(404).send({
                message: "Match not found.",
            });
        } else {
            const stadium = await Stadium.findById(match.stadium);
            if (!stadium) {
                return res.status(404).send({
                    message: "Stadium not found.",
                });
            } else {
                const stadium_places = stadium.length * stadium.width;
                if (reservation.place < 1 || reservation.place > stadium_places) {
                    return res.status(409).send({
                        message: "Invalid ticket number. number should be between 1 and " + stadium_places,
                    });
                }
            }
        }
        const saved_reservation = await reservation.save();
        if (saved_reservation) {
            res.status(200).send({
                message: "Reservation created.",
                reservation: reservation,
            });
        } else {
            res.status(400).send({
                message: "Reservation saving failed.",
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
