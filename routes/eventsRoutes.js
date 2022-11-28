const express = require('express');

const router = express.Router();

const events = require('../controllers/events');

router.get('/search', events.searchEvents);
router.get('/', events.getEvents);
router.get('/:id', events.getEventById);
router.post('/', events.createEvent);
router.patch('/:id', events.updateEvent);
router.delete('/:id', events.deleteEvent);
router.put('/:id', events.updateEvent);

module.exports = router;
