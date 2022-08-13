const mongoose = require("mongoose");
const User = require("../models/userModel");


// handle request to get all data
const homePage = async (req, res) => {
    const user = await User.findOne(
        { _id: req.user._id },
        {}
    ).lean();

    return res.render("home", {
        data: user,
    })
}

module.exports = {
    homePage,
};
