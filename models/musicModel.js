const { default: mongoose } = require("mongoose");

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

    liked: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
    ],
    
});

module.exports = mongoose.model("music", schema);