const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const api = supertest(app)

describe('when a user logins', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('whatever', 10)
    const user = new User({ username: 'Krax_Kotr', passwordHash })
  
    await user.save()
  })
  test('succeeds with correct status code when user is correct', async () => {
    const userAndPassword = {
      username: "Krax_Kotr",
      password: "whatever",
    }

    await api
    .post('/api/login')
    .send(userAndPassword)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  test('fails with correct status code when username is incorrect', async () => {
    const password = {
      username: "Krax_Kot",
      password: "whatever",
    }

    await api
      .post('/api/login')
      .send(password)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
  test('fails with correct status code when password is incorrect', async () => {
    const user = {
      username: "Krax_Kotr",
      password: "whatevr",
    }

    await api
      .post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})