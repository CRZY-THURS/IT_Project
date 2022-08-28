const mongoose = require("mongoose");
const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");
const Music = require("../models/musicModel");

const addPlaylist = async (req, res) => {
    var date = new Date();
    try {

        const playlist = new Playlist({
            name: req.body.name,
            description: req.body.description,
            create_date: date,
            is_default: false,
            musics: [],
        });

        await User.updateOne(
            { _id: req.user._id },
            { $push: { "playlists": playlist._id } }
        )

        playlist.save().then(
            setTimeout(function () {
                res.redirect("/home");
            }, 1000)
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    };
};

const addMusic = async (req, res) => {
    try {
        var date = new Date();

        const music = new Music({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            genre: req.body.genre,
            add_date: date,
            link: req.body.link,
            liked: [],
        });

        const user = await User.findOne({ _id: req.user._id },{}).lean();
        await Playlist.updateOne(
            { _id: user.playlists[0] },
            { $push: { "musics": music._id } }
        );

        music.save().then(
            setTimeout(function () {
                res.redirect("/home");
            }, 1000)
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    };
};

const getAllMusic = async (req, res) => {
    try {
        var date = new Date();

        const user = await User.findOne({ _id: req.user._id },{}).lean();

        const playlist0_id = user.playlists[0];

        const playlist0 = Playlist.findById(playlist0_id);

        res.send(playlist0);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    };
};

module.exports = {
    addPlaylist,
    addMusic,
    getAllMusic,
};