const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/userModel");

const editUserPassword = async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                (user.password = req.body.password),
                user
                    .save()
                    .then(() =>
                        res.send({
                            message: "password changed successfully",
                        })
                    )
                    .catch((error) => {
                        res.json(error);
                    });
            } else if (!user) {
                res.send({ message: "no such user" });
            }
        })
        .catch((error) => {
            res.json(error);
        });
};

const signupUser = async (req, res) => {
    var date = new Date();
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({ message: "User already exists" });
        }

        user = new User({
            email: req.body.email,
            password: req.body.password,
            screen_name: req.body.screen_name,
            gender: req.body.gender,
            profile_picture: req.body.profile_picture,
            start_date: date,
        });

        user.save();
        res.send({ message: "user signup successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const isAuthenticatedUser = (req, res, next) => {
    // If user is not authenticated via Passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    
    return next();
    // Otherwise, proceed to next middleware function
    // return next();
};

module.exports = {
    signupUser,
    isAuthenticatedUser,
    editUserPassword,
};
