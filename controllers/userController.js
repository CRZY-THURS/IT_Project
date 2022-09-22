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

    return res.render("myPlaylist", {
        playlist: playlist,
        data: user,
    });
};

// an backend-api for rendering a playlist
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

// whole library
const library = async (req, res) => {
    const user = await User.findOne(
        { _id: req.user._id },
        {}
    ).populate({ path: "playlists" }).lean();

    const playlist = await Playlist.findOne(
        { _id: req.params._id },
        {}
    ).populate({ path: "musics" }).lean();

    const musics = await Music.find().lean();
    console.log(musics);
    return res.render("library", {
        data: user,
        playlist: playlist,
        musics: musics,
    });
};

// an backend-api for getting all music in the library
const viewAllMusics = async (req, res) => {
    const allMusics = await Music.find({}).lean();
    return res.render("allMusics", {
        data: allMusics,
    });
};

const getProfile = async (req, res) => {
    const user = await User.findOne(
        { _id: req.user._id },
        {}
    ).lean();
    return res.render("profilePage", {
        data: user,
    });
};

module.exports = {
    homePage,
    viewAllMusics,
    myPlaylist,
    getProfile,
    library
};
