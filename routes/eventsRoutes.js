const express = require('express');
const router = express.Router();
const events = require('../data/events.json');

const eventsController = require('../controllers/eventsController');

router.get('/', eventsController.getAllEvents);
router.get('/:id', eventsController.getEventById);
router.post('/', eventsController.createEvent);
router.patch('/:id', eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);

module.exports = router;

