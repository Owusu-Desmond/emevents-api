const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies, extended: true allows to parse nested objects    

const events = {
    "1": {
        "name": "Event 1",
        "description": "This is the first event",
        "date": "2020-01-01",
        "time": "12:00",
        "location": "New York",
        "organizer": "John Doe",
    },
    "2": {
        "name": "Event 2",
        "description": "This is the second event",
        "date": "2020-02-02",
        "time": "13:00",
        "location": "New York",
        "organizer": "John Doe",
    },
    "3": {
        "name": "Event 3",
        "description": "This is the third event",
        "date": "2020-03-03",
        "time": "14:00",
        "location": "New York",
        "organizer": "John Doe",
    },
    "4": {
        "name": "Event 4",
        "description": "This is the fourth event",
        "date": "2020-04-04",
        "time": "15:00",
        "location": "New York",
        "organizer": "John Doe",
    },
}

app.get('/events', (req, res) => {
    if (Object.keys(events).length === 0) {
        res.status(404).send("No events found");
    }
    res.status(200).send(events);

})

app.get('/events/:id', (req, res) => {
    if (!events[req.params.id]) {
        return res.status(404).json({ error: 'Event not found' })
    }
    res.status(200).json(events[req.params.id])
})

app.post('/events', (req, res) => {
    const id = Object.keys(events).length + 1
    req.body.id = id
    events[id] = req.body

    if (res.status(201)) {
        res.json({
            "Success": `Event id ${id} created successfully`,
            "Event": events[id]
        })
    } else {
        res.status(400).json({ error: 'Event not created' })
    }
})

app.patch('/events/:id', (req, res) => {
    if (!events[req.params.id]) {
        return res.status(404).json({ error: 'Event not found' })
    } else {
        events[req.params.id] = req.body
        res.json({
            "Success": `Event id ${req.params.id } updated successfully`,
            "Event": events[req.params.id]
        })
    }
})

app.delete('/events/:id', (req, res) => {
    if (!events[req.params.id]) {
        return res.status(404).json({ error: 'Event not found' })
    } else {
        delete events[req.params.id] // delete the event
        res.json({
            "Success": "Event " + req.params.id + " deleted successfully",
            "Events": events
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
