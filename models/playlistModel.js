const { default: mongoose } = require("mongoose");

// a database schema for the playlist collection
const schema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false,
    },

    create_date: {
        type: Date,
        required: true,
    },

    is_default: {
        type: Boolean,
        required: true,
    },

    musics: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "music",
        },
    ],

});

module.exports = mongoose.model("playlist", schema);