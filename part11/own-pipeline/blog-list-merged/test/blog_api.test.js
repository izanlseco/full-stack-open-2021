const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

let tokenResponse

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('whatever', 10)
  const user = new User({
    username: 'Krax_Kotr',
    blogs: ['5a422bc61b54a676234d17fc'],
    passwordHash,
  })

  await user.save()

  tokenResponse = await api
    .post('/api/login')
    .send({
      username: 'Krax_Kotr',
      password: 'whatever',
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('when there are blogs created', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('viewing a specific blog', () => {
  test('_id is returned as id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('when creating a new blog', () => {
  test('with valid data returns 201 and the new blog is within the returned data', async () => {
    const newBlog = {
      title: 'Getting out of trouble.',
      author: 'Izan Lopez',
      url: 'https://ilopezseco.com/',
      likes: 35,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${tokenResponse.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const titles = response.map((blog) => blog.title)

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Getting out of trouble.')
  })

  test('when not set, likes is zero', async () => {
    const newBlogWithoutLikes = {
      title: 'Getting out of trouble.',
      author: 'Izan Lopez',
      url: 'https://ilopezseco.com/',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${tokenResponse.body.token}`)
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    const likes = response.map((blog) => blog.likes)

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(likes[response.length - 1]).toBe(0)
  })

  test('400 is returned when there is no title and url', async () => {
    const newBlogWithoutTitle = {
      author: 'Izan Lopez',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${tokenResponse.body.token}`)
      .send(newBlogWithoutTitle)
      .expect(400)
  })
})

describe('when deleting a blog', () => {
  test('succeeds if the author is the same that created the blog', async () => {
    const blogOfThisAuthor = '5a422bc61b54a676234d17fc'

    await api
      .delete(`/api/blogs/${blogOfThisAuthor}`)
      .set('Authorization', `bearer ${tokenResponse.body.token}`)
      .expect(204)

    const response = await helper.blogsInDb()

    expect(response).not.toContain(blogOfThisAuthor)
  })
  test('fails if the author is not the same that created the blog', async () => {
    const blogFromAnotherAuthor = '5a422aa71b54a676234d17f8'

    await api
      .delete(`/api/blogs/${blogFromAnotherAuthor}`)
      .set('Authorization', `bearer ${tokenResponse.body.token}`)
      .expect(401)
  })
})

describe('when updating a blog', () => {
  test('status code is 200', async () => {
    const validId = '5a422bc61b54a676234d17fc'

    const blog = {
      likes: 15,
    }

    await api
      .put(`/api/blogs/${validId}`)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
  jest.clearAllMocks()
  jest.resetAllMocks()
})
