const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('session', SessionSchema);
