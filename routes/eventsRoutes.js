const express = require('express');
const router = express.Router();

const events = require('../controllers/events');

router.get('/', events.getAllEvents);
router.get('/:id', events.getEventById);
router.post('/', events.createEvent);
router.patch('/:id', events.updateEvent);
router.delete('/:id', events.deleteEvent);

module.exports = router;

