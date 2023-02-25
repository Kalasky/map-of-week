const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  eventDate: {
    type: Date,
    required: true,
  },
  eventNumber: {
    type: Number,
    required: true,
  },
  eventInfo: {
    type: String,
    required: true,
  },
  mapName: {
    type: String,
    required: true,
  },
  mapAuthor: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: String,
      unique: true,
    },
  ],
  qualifierTimes: [
    {
      player: {
        type: String,
        unique: true,
      },
      time: {
        type: Number,
        default: 0,
      },
    },
  ],
  divisions: [
    {
      division: {
        type: Number,
        unique: true,
      },
      players: [
        {
          type: String,
          unique: true,
        },
      ],
    },
  ],
  eventStatus: {
    type: String,
    default: 'open',
  },
  eventWinners: {
    type: String,
    default: 'none',
  },
})

module.exports = mongoose.model('Event', eventSchema)
