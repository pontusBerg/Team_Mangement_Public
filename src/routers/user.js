const express = require('express')
const User = require('../models/User/User');
const router = new express.Router()
const auth = require('../middleware/auth')
require('../db/mongoose')


router.get('/users', auth, async (req, res) => {

  const teamId = req.user.team

  try {
    
    const users = await User.find({team: teamId})
    res.send(users)
  } catch (error) {
    
    res.status(400).send(error)
  }
})



router.post('/users', async (req, res) => {
  const {email, password, name} = req.body

  try {
    const user = new User({email, password, name})
    await user.save()
    res.status(201).send(user)
  } catch (error) {
    res.send(error)
  }
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body
  

  try {
  const user = await User.login(email, password)
  const token = await user.getAuthToken()

  res.cookie('token', token, {
    httpOnly: false,
    secure: false, 
  }).send(user)
    
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})

router.post('/logout', auth, async (req, res) => {
  try {
    await User.logout(req.user)
    res.clearCookie('token',  { path: '/', domain:"http://localhost:3000/" }).send()

  } catch (error) {
    
    res.send(error)
  }

})

router.get('/authByToken', auth, async (req, res) => {
  try {
    res.send(req.user)
  } catch (error) {
    res.send(error)
  }
})

router.patch('/users', auth, async(req, res) => {
  
  const {name, id} = req.body
  try {
    const user = await User.findOneAndUpdate({id}, {name})
   } catch (error) {
     res.send(error)
   }
})


module.exports = router