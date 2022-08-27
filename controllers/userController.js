const mongoose = require("mongoose");
const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");
const Music = require("../models/musicModel");


// handle request to get all data
const homePage = async (req, res) => {
    const user = await User.findOne(
        { _id: req.user._id },
        {}
    ).populate({ path: "playlists" }).lean();

    const playlist = await Playlist.findOne(
        { _id: user.playlists[0]._id },
        {}
    ).populate({ path: "musics" }).lean();

    return res.render("home", {
        playlist: playlist,
        data: user,
    });
};

const myPlaylist = async (req, res) => {
    const user = await User.findOne(
        { _id: req.user._id },
        {}
    ).populate({ path: "playlists" }).lean();

    const playlist = await Playlist.findOne(
        { _id: req.params._id },
        {}
    ).populate({ path: "musics" }).lean();

    return res.render("myPlaylist", {
        data: user,
        playlist: playlist,
    });
};

const viewAllMusics = async (req, res) => {
    const allMusics = await Music.find({}).lean();
    return res.render("allMusics", {
        data: allMusics,
    });
};

module.exports = {
    homePage,
    viewAllMusics,
    myPlaylist,
};
