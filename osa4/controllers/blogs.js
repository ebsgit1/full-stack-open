const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = express.Router()
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

// blogsRouter.get('/:id', (request, response, next) => {
//   Blog.findById(request.params.id)
//     .then(blog => {
//       if (blog) {
//         response.json(blog)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body
  const token = getTokenFrom(req)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id)

    if (result) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Invalid ID format' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true, runValidators: true, context: 'query' }
    )

    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    console.error('Error updating blog:', error.message)
    response.status(400).json({ error: 'Invalid data or ID' })
  }
})
module.exports = blogsRouter