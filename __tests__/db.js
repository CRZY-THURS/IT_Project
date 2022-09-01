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

describe('Valid test', () => {

    it('Valid user', async () => {
        const user = new User({
            email: "pat@gmail.com",
            password: "12345678",
            screen_name: "pat",
            profile_picture: 1,
            gender: "M",
            start_date: new Date(),
        });
        await user.validate().catch(err => {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        });
    });
    it('Valid music', async () => {
        const music = new Music({
            title: "test",
            artist: "test",
            album: "test",
            genre: "test",
            add_date: new Date(),
        });
        await music.validate().catch(err => {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        });
    });
    it('Valid playlist', async () => {
        const playlist = new Playlist({
            name: "test",
            create_date: new Date(),
            is_default: false,
        });
        await playlist.validate().catch(err => {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        });
    });
});