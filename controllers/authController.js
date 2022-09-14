const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");

// an backend-api for password changing
const editUserPassword = async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                if ((user.pquestions == req.body.question) && (user.psecret == req.body.secret)) {
                    (user.password = req.body.password),
                
                    user.save()
                    .then(() =>
                        res.send({
                            message: "password changed successfully",
                        })
                    )
                    .catch((error) => {
                        res.json(error);
                    });
                } else {
                    res.send({
                        message: "incorrect security answer",
                    })
                }
                
            } else if (!user) {
                res.send({ message: "no such user" });
            }
        })
        .catch((error) => {
            res.json(error);
        });
};

const editUserName = async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                (user.screen_name = req.body.screen_name),
                user
                    .save()
                    .then(() =>
                        res.send({
                            message: "names changed successfully",
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

// an backend-api for user signup
const signupUser = async (req, res) => {
    var date = new Date();
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(400)
                .json({ message: "User already exists" });
        }

        const default_playlist = new Playlist({
            name: "my music",
            description: "the default playlist",
            create_date: date,
            is_default: true,
            musics: [],
        });

        user = new User({
            email: req.body.email,
            password: req.body.password,
            screen_name: req.body.screen_name,
            gender: "U",
            profile_picture: 1,
            start_date: date,
            playlists: [default_playlist._id],
            pquestions: req.body.question,
            psecret: req.body.secret,
        });

        default_playlist.save();
        user.save();
        return res.redirect("/login");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// an backend-api for user authentication
const isAuthenticatedUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    return next();
};

// an backend-api for getting user preset questions
const getPquestions = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        .lean
        .populate({path: "pqusetions"});
        res.send(user.pquestions);
    }catch(error){
        res.json(error);
    }
}

// an backend-api for validating user preset questions
const forgetPassword = async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user.psecret === req.body.psecret) {
                res.send({ message: "Correct Answer!" });
            } else {
                res.send({ message: "Incorrect Answer!" });
            }
        }).catch((error) => {
            res.json(error);
        }
        );
}

module.exports = {
    signupUser,
    isAuthenticatedUser,
    editUserPassword,
    forgetPassword,
    getPquestions,
    editUserName,
};
