
const events = require('../data/events.json');

const getAllEvents = async (req, res) => {
    try {
        if (Object.keys(events).length === 0) {
            res.status(404).send("No events found");
        }
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEventById = async (req, res) => {
    try {
        if (!events[req.params.id]) {
            return res.status(404).json({ error: 'Event not found' })
        }
        res.status(200).json(events[req.params.id])
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
    

const createEvent = async (req, res) => {
    try {
        const id = Object.keys(events).length + 1
        req.body.id = id
        events[id] = req.body

        if (res.status(201)) {
            res.json({
                "Success": `Event created successfully`,
                "Event": events[id]
            })
        } else {
            res.status(400).json({ error: 'Event not created' })
        }
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateEvent = async (req, res) => {
    try {
        if (!events[req.params.id]) {
            return res.status(404).json({ error: 'Event not found' })
        } else {
            events[req.params.id] = req.body
            res.json({
                "Success": `Event updated successfully`,
                "Event": events[req.params.id]
            })
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteEvent = async (req, res) => {
    try {
        if (!events[req.params.id]) {
            return res.status(404).json({ error: 'Event not found' })
        } else {
            delete events[req.params.id] // delete the event
            res.json({
                "Success": "Event deleted successfully",
                "Error": {}
            })
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}