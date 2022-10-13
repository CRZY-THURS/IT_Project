const { default: mongoose } = require("mongoose");

// a database schema for the music collection
const schema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    artist: {
        type: String,
        required: true,
    },

    album: {
        type: String,
        required: false,
    },

    genre: {
        type: String,
        required: true,
    },

    add_date: {
        type: Date,
        required: true,
    },

    link: {
        type: String,
        required: false,
    },
    
});

module.exports = mongoose.model("music", schema);