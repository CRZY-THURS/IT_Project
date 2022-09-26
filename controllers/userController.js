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

    const defau = await [user.playlists[0]];
    // console.log(defau);

    const plays = await user.playlists.slice(1);
    // console.log(plays);

    const playlist = await Playlist.findOne(
        { _id: user.playlists[0]._id },
        {}
    ).populate({ path: "musics" }).lean();

    return res.render("myPlaylist", {
        playlist: playlist,
        data: user,
        defau: defau,
        plays: plays,
    });
};

// an backend-api for rendering a playlist
const myPlaylist = async (req, res) => {
    const user = await User.findOne(
        { _id: req.user._id },
        {}
    ).populate({ path: "playlists" }).lean();

    const defau = await [user.playlists[0]];
    // console.log(defau);

    const plays = await user.playlists.slice(1);
    // console.log(plays);

    const playlist = await Playlist.findOne(
        { _id: req.params._id },
        {}
    ).populate({ path: "musics" }).lean();

    return res.render("myPlaylist", {
        playlist: playlist,
        data: user,
        defau: defau,
        plays: plays,
    });
};

// whole library
const library = async (req, res) => {
    const user = await User.findOne(
        { _id: req.user._id },
        {}
    ).populate({ path: "playlists" }).lean();

    const defau = await [user.playlists[0]];
    // console.log(defau);

    const plays = await user.playlists.slice(1);
    // console.log(plays);

    const playlist = await Playlist.findOne(
        { _id: req.params._id },
        {}
    ).populate({ path: "musics" }).lean();

    const musics = await Music.find().lean();
    const array = [];
    // console.log(defau[0].musics);
    for (m of musics) {
        //console.log(defau[0].musics[0].equals(m._id));
        var check = 0;
        for (ele of defau[0].musics) {
            console.log(ele);
            console.log(m._id);
            if (ele.equals(m._id)) {
                check = 1;
            }
        }
        if (check == 1) {
            array.push({m, exist:1});
        }
        else if (check == 0) {
            array.push({m, exist:0});
        }
    }
    console.log(array);
    return res.render("library", {
        data: user,
        playlist: playlist,
        musics: array,
        defau: defau,
        plays: plays,
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
