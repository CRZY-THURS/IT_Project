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

    return res.render("home", {
        data: user,
    });
};

const viewAllMusics = async (req, res) => {
    const allMusics = await Music.find({}).lean();
    return res.render("allMusics", {
        data: allMusics,
    });
};

const viewMyPlaylists = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id },{}).lean();
    const myPlaylists = await Playlist.find({ _id: { $in: user.playlists } }).lean();
    return res.render("myPlaylists", {
        data: myPlaylists,
    });
};


module.exports = {
    homePage,
    viewAllMusics,
    viewMyPlaylists,
};
