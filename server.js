const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/eventsRoutes');

mongoose.connect(process.env.DB_URL, (err) => {
  if (err) throw err;
  console.log('Connected to database');
});

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies, extended: true allows to parse nested objects

app.use('/api/events', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
