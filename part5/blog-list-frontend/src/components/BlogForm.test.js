import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('calls the event handler', async () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={addBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'React seems fun' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Izan L. Seco' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'http://www.reactseemsfun.com' }
  })

  fireEvent.submit(form)

  await waitFor(() => {
    expect(addBlog.mock.calls[0][0].title).toBe('React seems fun')
    expect(addBlog.mock.calls[0][0].author).toBe('Izan L. Seco')
    expect(addBlog.mock.calls[0][0].url).toBe('http://www.reactseemsfun.com')
  })
})