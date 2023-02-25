const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  discordId: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    default: 'player',
    },
  trophies: {
    first: {
      type: Number,
      default: 0,
    },
    second: {
      type: Number,
      default: 0,
    },
    third: {
      type: Number,
      default: 0,
    },
  },
  eventsParticipated: {
    type: Number,
    default: 0,
  },
  allPlacements: [
    {
      type: Number,
      default: 0,
    },
  ],
  blacklisted: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Player', playerSchema)
