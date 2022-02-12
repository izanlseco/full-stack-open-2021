import React, { useState } from 'react'

const Blog = ({ blog, like, deleteBlog }) => {
  const [visible, setVisible] = useState(null)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className='blog-default' style={hideWhenVisible}>
        {blog.title} {blog.author}<button id="show-button" onClick={toggleVisibility}>view</button>
      </div>
      <div className='blog-expanded' style={showWhenVisible}>
        {blog.title} {blog.author} <button id="hide-button" onClick={toggleVisibility}>hide</button><br/>
        {blog.url} <br />
        <span id="likes">{blog.likes}</span> <button id="like-button" onClick={like}>like</button> <br/>
        {blog.user !== undefined ? blog.user.name : ''} <br />
        <button id="delete-button" onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
