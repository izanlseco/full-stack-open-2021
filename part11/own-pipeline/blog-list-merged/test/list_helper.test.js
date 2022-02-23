const listHelper = require('../utils/list_helper')

test('Dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

afterAll(() => {
  jest.clearAllMocks()
  jest.resetAllMocks()
})
