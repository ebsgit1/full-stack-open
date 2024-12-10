const express = require('express')
const Blog = require('../models/blog')
const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
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
blogsRouter.post('/', async (request, response) => {
  const { title, url, author, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})


// blogsRouter.delete('/:id', (request, response, next) => {
//   Blog.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// blogsRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const blog = {
//     content: body.content,
//     important: body.important,
//   }

//   Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then(updatedBlog => {
//       response.json(updatedBlog)
//     })
//     .catch(error => next(error))
// })

module.exports = blogsRouter