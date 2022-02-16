let _ = require('lodash')

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  } 
]

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item
  const total = []

  blogs.forEach(blog => {
    total.push(blog.likes)
  })

  return total.length === 0
    ? 0
    : total.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const max = Math.max.apply(Math, blogs.map((blog) => blog.likes))
  return blogs.find((blog) => blog.likes === max)
}

const mostBlogs = (blogs) => {
  let authorWithMostBlogs = _.chain(blogs)
    .sortBy('length')
    .map('author')
    .last()
    .value()

  let countOfMostBlogs = _.chain(blogs)
    .countBy('author')
    .map((value, key) => value)
    .last()
    .value()

  const returnedObject = {
    author: authorWithMostBlogs,
    blogs: countOfMostBlogs
  }

  return returnedObject
}

const mostLikedAuthor = (blogs) => {
  return _.chain(blogs)
    .groupBy('author')
    .map((value, key) => {
      return {
        'author': key,
        'likes': _.sumBy(value, 'likes')
      }
    })
    .sortBy('likes')
    .last()
    .value()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikedAuthor,
  usersInDb,
}