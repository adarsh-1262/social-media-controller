// backend/models/SocialLink.js
const mongoose = require('mongoose');

const SocialLinkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: String, required: true }, // Assuming user is identified by an ID or username
});

module.exports = mongoose.model('SocialLink', SocialLinkSchema);
