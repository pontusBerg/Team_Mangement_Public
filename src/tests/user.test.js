/* const User = require('../models/User/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const server = require('../app')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
  _id: userOneId,
  name: "Pontus",
  email: "pb@pb.com",
  password: "test123",
  team: "5993fcad9a63350df274b3e6",
  tokens: [{
    token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
  }]
}


beforeAll((done) => {
 server.listen(4002, () => done())
})

beforeEach(async () => {
  
  
  await User.deleteMany()
  await new User(userOne).save()
})


test('should sign up a new user', async () => {
  await request(app).post('/api/users').send().expect(200)
})

test('Should log in existing user', async () => {
  await request(app).post('/api/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)
}) 

test('Should not sign in existing user', async() => {
  await request(app).post('/api/login').send({
    email: userOne.email,
    password: "wrong-password"
  }).expect(400)
})

test("Should get all users", async () => {
  await request(app)
  .get('/api/users')
  .set('Cookie', `token=${userOne.tokens[0].token}`)
  .send()
  .expect(200)
})

test("Should not get all users for unathorized user", async () => {
  await request(app)
  .get('/api/users')
  .set('Cookie', `token=12345`)
  .send()
  .expect(400)
})

test() */