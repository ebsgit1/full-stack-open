const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, current) => {
    return current.likes > (prev.likes || 0) ? current : prev
  }, {})

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {

  const blogCounts = _.countBy(blogs, 'author')
  const mostBlogs = Object.entries(blogCounts).reduce((max, [author, count]) => {
    if (count > max.blogs) {
      return { author, blogs: count }
    }
    return max
  }, { author: null, blogs: 0 })

  return mostBlogs
}

const mostLikes = (blogs) => {
  const likesPerAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const mostLikes = Object.entries(likesPerAuthor).reduce(
    (max, [author, likes]) => {
      if (likes > max.likes) {
        return { author, likes }
      }
      return max
    },
    { author: null, likes: 0 }
  )

  return mostLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }