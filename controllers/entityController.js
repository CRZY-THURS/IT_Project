const mongoose = require("mongoose");
const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");
const Music = require("../models/musicModel");

// an backend-api for adding playlist
const addPlaylist = async (req, res) => {
    var date = new Date();
    var visibility = true;
    try {

        if (req.body.visibility) {
            visibility = false;
        }
        const playlist = new Playlist({
            name: req.body.name,
            description: req.body.description,
            create_date: date,
            is_default: false,
            is_public: visibility,
            musics: [],
        });

        await User.updateOne(
            { _id: req.user._id },
            { $push: { "playlists": playlist._id } }
        )

        playlist.save().then(
            setTimeout(function () {
                res.redirect("/home");
            }, 500)
        );

    } catch (err) {
        console.error(err.message);
        res.status(500);
    };
};

// an backend-api for adding music to library
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
            }, 500)
        );

    } catch (err) {
        console.error(err.message);
        res.status(500);
    };
};

// an backend-api for getting addMusicToPlaylist page
const getMusicForAdding = async (req, res) => {
    try {
        const playlist = await Playlist.findOne(
            { _id: req.params._id },
            {}
        ).lean();

        const musicAlreadyExist = await Playlist.findOne(
            { _id: req.params._id },
            {}
        ).populate({ path: "musics" }).lean();

        const idsAllreadyExist = musicAlreadyExist.musics.map(music => music._id);

        const allMusics = await Music.find({"_id": { "$nin": idsAllreadyExist }}).lean();

        return res.render("addMusicToPlaylist", {
            musics: allMusics,
            playlist: playlist,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500);
    };
};

// an backend-api for adding music to playlist
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
            res.status(500);
    };
};

// an backend-api for getting all musics in default playlist
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
        res.status(500);
    };
};

// an backend-api for getting all musics in database
const browseAllMusic = async (req, res) => {
    try {
        var date = new Date();

        const musics = await Music.find().lean();
        return res.render("addMusicToPlaylist", {
            musics: musics,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500);
    };
};

// an backend-api for adding one music from all music browsing page to own library
const addFromAllMusic = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id },{}).lean();

        await Playlist.updateOne(
            { _id: user.playlists[0] },
            { $addToSet: { "musics": req.params._musicId } }
        );

        res.redirect("/library");

    } catch (err) {
        console.error(err.message);
        res.status(500);
    };
};

// an backend-api for deleting playlists
const deletePlaylist = async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.user._id },{}).lean();
        const playlist = await Playlist.findOne(
            { _id: req.params._id },
            {}
        ).lean();
        const playlists = user.playlists.map(id => id.toString())

        if (playlists.includes(playlist._id.toString())) {
            if (playlist.is_default) {
                res.send({ message: "Cannot delete default playlist" });
            } else {
                await User.updateOne(
                    { _id: req.user._id },
                    { $pull: { "playlists": req.params._id } }
                ).then(
                    setTimeout(function () {
                        res.redirect("/home");
                    }, 500)
                );
            }
        } else {
            res.send({ message: "Permission denied" });
        }

    } catch (err) {
            console.error(err.message);
            res.status(500);
    };
};

// an backend-api for removing music from playlist
const deleteMusic = async (req, res) => {
    try {

        await Playlist.updateOne(
            { _id: req.params._id },
            { $pull: { "musics": req.body.music_id } }
        ).then(
            setTimeout(function () {
                res.redirect("/home/" + req.params._id);
            }, 500)
        );
    } catch (err) {
        console.error(err.message);
        res.status(500);
    };
};


module.exports = {
    addPlaylist,
    addMusic,
    getMusicForAdding,
    addMusicToPlaylist,
    getAllMusic,
    browseAllMusic, 
    addFromAllMusic,
    deletePlaylist,
    deleteMusic,
};