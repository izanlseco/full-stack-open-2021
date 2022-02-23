const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { body } = request

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token invalid or missing.' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes !== undefined ? body.likes : 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const verifiedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !verifiedToken.id) {
    return response.status(401).json({ error: 'token invalid or missing.' })
  }

  const decodedToken = jwt.decode(request.token)
  const userWithBlogs = await User.findById(decodedToken.id)

  if (!userWithBlogs.blogs.includes(request.params.id)) {
    return response
      .status(401)
      .json({ error: 'user unauthorized to remove this blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  return response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { body } = request

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogRouter
