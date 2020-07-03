const mongoose = require('mongoose');

const blacklistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: {type: String, required: true},
    expiry: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Blacklist', blacklistSchema);