const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  description: {
    type: String, 
    required: true, 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: "User"
  },
  createdFor: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "User" 
  },
  seen: {
    type: Boolean, 
    default: false, 
    required: true,  
  },
  todo: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Todo",
    required: true, 
  }
}, {
  timestamps: true,
})



require('./Methods/generateNotificationMessage')(notificationSchema)


const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification