const Event = require('../models/eventModel');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      return res.status(200).json(event);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid event ID' }); // 400 Bad Request
    }
    res.status(500).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (event) {
      return res.status(200).json(event);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (event) {
      return res.status(200).json({ message: 'Event deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchEvents = async (req, res) => {
  try {
    let query = {};
    if (req.query.title) {
      query.title = req.query.title;
      const events = await Event.find( { $text: { $search: query.title } } );
      res.status(200).json(events);
    }else {
      const events = await Event.find();
      res.status(200).json(events);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  searchEvents,
};
