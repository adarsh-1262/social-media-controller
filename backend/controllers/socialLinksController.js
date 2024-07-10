// backend/controllers/socialLinksController.js
const SocialLink = require('../models/SocialLink');

exports.getLinks = async (req, res) => {
    try {
        const links = await SocialLink.find({ user: req.params.userId });
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLink = async (req, res) => {
    const { name, url, user } = req.body;
    const newLink = new SocialLink({ name, url, user });

    try {
        const savedLink = await newLink.save();
        res.status(201).json(savedLink);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateLink = async (req, res) => {
    try {
        const updatedLink = await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLink);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteLink = async (req, res) => {
    try {
        await SocialLink.findByIdAndDelete(req.params.id);
        res.json({ message: 'Link deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
