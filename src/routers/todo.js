const express = require('express')
const Todo = require('../models/Todo/Todo')
const router = new express.Router()
const auth = require('../middleware/auth')
const { populate, update } = require('../models/Todo/Todo')



// GET USER TODOS
router.get('/todos/user', auth, async (req, res) => {

  const userId = req.user._id
  try {
    const todos = await Todo.find({
      user: userId,
      completed: false
    })
    await Promise.all(todos.map((todo) => {
      return todo.populate('user', '-tokens -password -email').execPopulate()
    }))
    res.send(todos)
  } catch (error) {
    res.status(400).send(error)
  }
})


// GET TEAM TODOS
router.get('/todos/team', auth, async (req, res) => {

  const {team} = req.user
  try {
    const todos = await Todo.find({
      team: team,
      user: null 
    })
    

    await Promise.all(todos.map((todo) => {
      return todo.populate('user', '-tokens -password -email').execPopulate()
    }))
    res.send(todos)
  } catch (error) {
    
    res.send(error)
  }
})


// GET ONE TODO WITH TIMELINE
router.get('/todos/:id/timeline', auth, async (req, res) => {
  
  const {id} = req.params
  
  try {
    const todo = await Todo.findById(id);
    await todo.populate({path: 'timelines', populate: {path: "user"}}).populate('user').execPopulate()

    
    const todoWithTimeline = {
      todo, 
      timeline: todo.timelines
    }

   res.send(todoWithTimeline) 
  
  } catch (error) {
    
    res.send(error)
  }
})


// GET TODO BY ID
router.get('/todos/:id', auth, async (req, res) => {

  const {
    id
  } = req.params;
  try {
    const todo = await Todo.findById(id)
    res.send(todo)
  } catch (error) {
    
    res.send(error)
  }
})


router.post('/todos', auth, async (req, res) => {

  const {todoInfo} = req.body
  
  const todo = new Todo(todoInfo)

  try {
    await todo.save()
    
    console.log(todo)
    res.send(todo)
  } catch (error) {
    res.status(403).send(error)
  }
})


router.patch('/todos/:id', auth, async (req, res) => {
  const {updates} = req.body
  const {id} = req.params
  try {
    await Todo.verifyUser(id, req.user._id)
    const todo = await Todo.findByIdAndUpdate(id, updates)
    res.send(todo)
  } catch (error) {
    
    res.status(400).send(error)
  }
})




router.delete('/todos/:id', auth, async (req, res) => {
  const {id} = req.params
  try {
    Todo.verifyUser(id, req.user._id)
    const todo = await Todo.findByIdAndDelete(id)
    res.send(todo)
  } catch (error) {
    
    res.status(400).send(error)
  }
})

module.exports = router