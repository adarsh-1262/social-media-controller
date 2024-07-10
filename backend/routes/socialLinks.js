// backend/routes/socialLinks.js
const express = require('express');
const router = express.Router();
const socialLinksController = require('../controllers/socialLinksController');

router.get('/:userId', socialLinksController.getLinks);
router.post('/', socialLinksController.createLink);
router.put('/:id', socialLinksController.updateLink);
router.delete('/:id', socialLinksController.deleteLink);

module.exports = router;
