const mongoose = require('mongoose')

const timelineSchema = new mongoose.Schema({

  message: {
    required: true,
    type: String,
  },

  category: {
    required: true,
    type: String,
  },

  team: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  todo: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo"
  }
}, {
  timestamps: true
})

require('./methods/generateTimelineMessage')(timelineSchema)


const Timeline = mongoose.model('Timeline', timelineSchema)

module.exports = Timeline