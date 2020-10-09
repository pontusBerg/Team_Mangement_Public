const express = require('express')
const Timeline = require('../models/Timeline/Timeline')
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/timelines', auth, async (req, res) => {

  const {
    type,
    id,
    updates
  } = req.body

  const {
    team,
    _id
  } = req.user;
  

  const message = Timeline.generateTimelineMessage(type, req.user, updates)

  const timelineInfo = {
    category: type, 
    message,
    team,
    user: _id,
    todo: id,
  }

  
  try {
    const timeline = new Timeline(timelineInfo)
    await timeline.save()
    res.send(timeline)
  } catch (error) {
    
    res.send(error)
  }
})


module.exports = router