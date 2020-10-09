const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Notification = require('../models/Notification/Notification')



router.get('/notifications', auth, async (req, res) => {
  const {
    _id
  } = req.user;

  try {
    const notifications = await Notification.find({
      createdFor: _id,
    }).limit(6).sort('-createdAt')
    const notificationsUser = await Promise.all(notifications.map((notification) => {
      return notification.populate('createdBy').execPopulate()
    }))
    console.log(notificationsUser)
    res.send(notificationsUser)
  } catch (error) {

    res.send(error)
  }
})

router.get('/notification/:id', auth, async (req, res) => {

  const {
    id
  } = req.query

  try {
    const notifications = await Notification.find({
      createdFor: id
    })
    res.send(notifications)
  } catch (error) {
    res.send(error)
  }
})

router.post('/notifications', auth, async (req, res) => {
  const {
    type,
    todo
  } = req.body

  try {
    const message = Notification.generateNotificationMessage(todo, type, req.user);
    const notification = new Notification({
      todo: todo._id,
      createdBy: req.user._id,
      createdFor: todo.user,
      description: message,
    })
    console.log(notification)
    await notification.save()
    res.send(notification)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/notifications/:id', auth, async (req, res) => {
  const {
    updates
  } = req.body;

  const {
    id
  } = req.params;


  try {
    const notification = await Notification.findByIdAndUpdate(id, updates)
    res.send(notification)
  } catch (error) {
    res.send(error)
  }


})


module.exports = router