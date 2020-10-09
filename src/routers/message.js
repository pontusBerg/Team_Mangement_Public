const express = require('express')
const router = new express.Router()
const Message = require('../models/Message/Message')
const auth = require('../middleware/auth')

router.get('/messages', auth, async (req, res) => {

  const {
    skip,
    limit
  } = req.query;
  const {
    team
  } = req.user


  try {
    
    const messages = await Message.find({
      team
    }).sort([
      ['createdAt', -1]
    ]).skip(parseInt(skip)).limit(parseInt(limit))

    await Promise.all(messages.map((message) => {
      return message.populate('user').execPopulate()
    }))
    res.send(messages)
  } catch (error) {
    
    res.send(error)
  }
})


router.post('/messages', auth, async (req, res) => {

  const {
    message
  } = req.body
  const {
    _id,
    team
  } = req.user
  const messageInfo = {
    message,
    user: _id,
    team
  }
  try {
    const message = new Message(messageInfo)
    await message.save()
    await message.populate('user').execPopulate()
    res.send(message)
  } catch (error) {
    
    res.send(error)
  }
})

module.exports = router