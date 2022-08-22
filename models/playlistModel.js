const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
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