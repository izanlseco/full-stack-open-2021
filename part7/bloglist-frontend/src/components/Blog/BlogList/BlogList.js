/* eslint-disable indent */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core'

import Blog from '../Blog'
import BlogForm from '../BlogForm/BlogForm'
import React from 'react'

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>Create new</h2>
      <BlogForm />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs
              ? blogs
                  .sort((a, b) => a.likes < b.likes)
                  .map((blog) =>
                    <TableRow key ={blog.id}>
                      <TableCell>
                        <Blog key={blog.id} blog={blog} />
                      </TableCell>
                      <TableCell>
                        {blog.user.name}
                      </TableCell>
                    </TableRow>)
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
