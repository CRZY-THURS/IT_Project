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

const getMusicForAdding = async (req, res) => {
    const playlist = await Playlist.findOne(
        { _id: req.params._id },
        {}
    ).lean();

    const allMusics = await Music.find({}).lean();

    return res.render("addMusicToPlaylist", {
        musics: allMusics,
        playlist: playlist,
    });
};

const addMusicToPlaylist = async (req, res) => {
    try {
        const musics = req.body.musics;

        await Playlist.updateOne(
            { _id: req.params._id },
            { $addToSet: { "musics": { $each: musics } } }
        ).then(
            setTimeout(function () {
                res.redirect("/home/" + req.params._id);
            }, 500)
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

        const playlist = await Playlist.findOne(
            { _id: user.playlists[0]._id },
            {}
        ).populate({ path: "musics" }).lean();


        res.send(playlist);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    };
};

module.exports = {
    addPlaylist,
    addMusic,
    getMusicForAdding,
    addMusicToPlaylist,
    getAllMusic,
};