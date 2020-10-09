require('dotenv').config()
require('../db/mongoose')
const User = require('../models/User/User')
const Team = require('../models/Team/Team')
const Todo = require('../models/Todo/Todo')
const Message = require('../models/Message/message')
const Notification = require('../models/Notification/Notification')
const Timeline = require('../models/Timeline/Timeline')

const seed = async () => {
  const team = {
    name: "The Team",
  }
  const newTeam = await new Team(team).save()

  console.log(newTeam)

  const users = [{
      name: "Stephanie Stacy",
      email: "stephaniestacy@team.com",
      password: "test123",
      profileImg: "https://res.cloudinary.com/doem0zjpf/image/upload/v1601900090/stephanie-stacy_n7rfh1.jpg",
      team: newTeam._id
    },
    {
      name: "Kathie Andrewson",
      email: "kathieandrewson@team.com",
      password: "test123",
      profileImg: "https://res.cloudinary.com/doem0zjpf/image/upload/v1601900090/kathie_z5euqd.jpg",
      team: newTeam._id
    },
    {
      name: "Kody Nicholson",
      email: "kodynicholson@team.com",
      password: "test123",
      profileImg: "https://res.cloudinary.com/doem0zjpf/image/upload/v1601900358/kody_yglvc0.jpg",
      team: newTeam._id,
    },

    {
      name: "John Kendal",
      email: "johnkendal@team.com",
      password: "test123",
      profileImg: "https://res.cloudinary.com/doem0zjpf/image/upload/v1601900635/John_ojgidr.jpg",
      team: newTeam._id
    },
    {
      name: "Devin Dustin",
      email: "devindustin@team.com",
      password: "test123",
      profileImg: "https://res.cloudinary.com/doem0zjpf/image/upload/v1601900816/dustin_rjfbld.jpg",
      team: newTeam._id
    }

  ]

  const newUsers = await users.forEach((user) =>  new User(user).save())



}
seed()