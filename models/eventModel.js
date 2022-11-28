const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  organizer: { type: String, required: true },
  avatar: {
    type: String,
    default: 'https://mootup.com/wp-content/uploads/2020/07/Zoom-webinar-3d-8.8-screens-1024x576.png',
  },
  organizerLink: { type: String },
  organizerAvatar: {
    type: String,
    default: 'https://img.freepik.com/premium-vector/person-avatar-design_24877-38137.jpg?w=2000',
  },
});

module.exports = mongoose.model('Event', eventModel);
