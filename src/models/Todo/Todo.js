const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  urgency: {
    type: Number,
    default: -1
  },
  difficulty: {
    type: Number,
    default: -1
  },
  category: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, 
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'User',
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team'
  }
}, {
  timestamps: true
})

todoSchema.virtual('notifications', {
  ref: 'Notification',
  localField: '_id',
  foreignField: 'todo'
})

todoSchema.virtual('timelines', {
  ref: 'Timeline',
  localField: '_id',
  foreignField: 'todo'
})

require('./methods/verifyUser')(todoSchema)


const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo