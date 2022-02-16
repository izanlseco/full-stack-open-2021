import { Link } from 'react-router-dom'
import React from 'react'

const Blog = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`}>
      {blog.title} {blog.author}
    </Link>
  )
}

export default Blog
