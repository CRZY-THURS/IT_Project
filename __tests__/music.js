const User = require("../models/userModel");
const Playlist = require("../models/playlistModel");
const Music = require("../models/musicModel");
const mongoose = require('mongoose');

const invalidUser ={
    email: "",
    password: "",
    screen_name: "",
    profile_picture: 0,
}
const invalidPlaylist = {
    name: ""
}
const invalidMusic = {
    title: ""
}
describe('Invalid test', () => {
    it('Invalid user', async () => {
        const user = new User(invalidUser);
        await user.validate().catch(err => {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        });
    });
    it('Invalid music', async () => {
        const music = new Music(invalidMusic);
        await music.validate().catch(err => {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        });
    });
    it('Invalid playlist', async () => {
        const playlist = new Playlist(invalidPlaylist);
        await playlist.validate().catch(err => {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        });
    });
});


