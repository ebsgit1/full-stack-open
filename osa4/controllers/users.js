const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1 }) // Specify the fields to include
  response.json(users)
})
usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'Password must be at least 3 characters long',
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    if (error.code === 11000) {
      response.status(400).json({
        error: 'Username must be unique',
      })
    } else {
      next(error)
    }
  }
})

module.exports = usersRouter
