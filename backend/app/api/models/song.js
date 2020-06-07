const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    album: {type: String, required: false},
    artist: {type: String, required: true},
    genre: {type: String, required: false},
    duration: {type: Number, required: false},
    release_date : {type: String, required: false},
    lyrics: {type: String, required: true},
    lyrics_id: {type: Number,unique: true,required: true},
    lyrics_source : {type: String, required: false},
    updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Songs', songSchema);