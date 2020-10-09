const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema ({
  name: {
    type: String, 
    required: true, 
  },
  email: {
    type: String,  
    unique: true,
    required: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value)
      }
    }
  },
  password: {
    type: String, 
    required: true,
    minlength: 7, 

  },
  profileImg: {
    type: String,
    
  },
  tokens: [{
    token: {
      type: String,
    }
  }],
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true, 
  },
}, {
  timestamps: true
})


userSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'user'
})

userSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'user'
})

userSchema.virtual('createdBy', {
  ref: 'Notification',
  localField: '_id',
  foreignField: 'createdBy'
})


userSchema.virtual('timelines', {
  ref: 'Timeline',
  localField: '_id',
  foreignField: 'user'
})

require('./methods/validateEmail')(userSchema)
require('./methods/getAuthToken')(userSchema)
require('./methods/hashPassword')(userSchema)
require('./methods/login')(userSchema)


const User = mongoose.model('User', userSchema)

module.exports = User