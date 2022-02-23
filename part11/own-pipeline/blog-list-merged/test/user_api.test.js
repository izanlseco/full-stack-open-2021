const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

describe('When there is initially one user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
  test('creation succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Life0',
      name: 'Izan Lopez',
      password: 'whatever',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and error message when the username already exists', async () => {
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')
  })
  test('creation fails with proper statuscode and error message when there is no username', async () => {
    const newUser = {
      name: 'Izan Lopez',
      password: 'whatever',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')
  })
  test('creation fails with proper statuscode and error message when there is no password', async () => {
    const newUser = {
      username: 'Life0',
      name: 'Izan Lopez',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password must be longer')
  })
})

afterAll(() => {
  mongoose.connection.close()
  jest.clearAllMocks()
  jest.resetAllMocks()
})
