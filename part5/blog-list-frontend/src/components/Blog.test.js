import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders only title and author by default', () => {
    const blog = {
      title: 'React seems fun',
      author: 'Izan L. Seco',
      url: 'http://www.reactseemsfun.com',
      likes: 15,
    }

    const component = render(
      <Blog blog={blog} />
    )

    const defaultDiv = component.container.querySelector('.blog-default')

    expect(defaultDiv).toHaveTextContent(
      'React seems fun'
    )

    expect(defaultDiv).toHaveTextContent(
      'Izan L. Seco'
    )

    expect(defaultDiv).toHaveTextContent(
      'view'
    )

    expect(defaultDiv).not.toHaveTextContent(
      'http://www.reactseemsfun.com'
    )

    expect(defaultDiv).not.toHaveTextContent(
      15
    )
  })

  test('url and likes are shown when button is clicked', () => {
    const blog = {
      title: 'React seems fun',
      author: 'Izan L. Seco',
      url: 'http://www.reactseemsfun.com',
      likes: 15,
    }

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const expandedDiv = component.container.querySelector('.blog-expanded')

    expect(expandedDiv).toHaveTextContent(
      'http://www.reactseemsfun.com'
    )

    expect(expandedDiv).toHaveTextContent(
      15
    )
  })

  test('if like button is clicked twice, event handler is called twice', () => {
    const like = jest.fn()

    const blog = {
      title: 'React seems fun',
      author: 'Izan L. Seco',
      url: 'http://www.reactseemsfun.com',
      likes: 15,
    }

    const component = render(
      <Blog blog={blog} like={like} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(like.mock.calls).toHaveLength(2)
  })
})