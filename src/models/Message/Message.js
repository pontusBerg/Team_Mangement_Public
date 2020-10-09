const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    requried: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Team"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
}, {
  timestamps: true,
})


const Message = mongoose.model('Message', messageSchema)

module.exports = Message