const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
  },
})

teamSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'team'
})

teamSchema.virtual('Timelines', {
  ref: 'Timeline',
  localField: '_id',
  foreignField: 'team'
})

const Team = mongoose.model('Team', teamSchema)
module.exports = Team