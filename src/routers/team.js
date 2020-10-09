const express = require('express')
const Team = require('../models/Team/Team');
const router = new express.Router()
const auth = require('../middleware/auth')
require('../db/mongoose')


router.post('/team', async(req, res) => {

  const {name} = req.body

  const team = new Team({name})

  try {
  await team.save()
  res.send(team)
  } catch (error) {
    res.send(error)
  }
})



// Get all users in a team
router.get('/team/users', auth, async(req, res) => {
  const teamId = req.user.team

  try {
    const team = await (await Team.findById(teamId).populate('users')).execPopulate()
    res.send(team.users)
  } catch (error) {
    res.send(error)
  }
})



module.exports = router