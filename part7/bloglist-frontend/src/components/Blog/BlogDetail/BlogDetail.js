import { Button, TextField, Typography } from '@material-ui/core'
/* eslint-disable indent */
import React, { useState } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'

import blogService from '../../../services/blogs'
import { updateBlogs } from '../../../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogDetail = ({ blogs }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const matchByBlog = useMatch('/blogs/:id')
  const matchedBlog = matchByBlog
    ? blogs.find((blog) => blog.id === matchByBlog.params.id)
    : null

  const handleUpdateLike = async (id) => {
    const blogToUpdate = blogs.find((b) => b.id === id)

    const newObject = {
      user: blogToUpdate.user,
      likes: blogToUpdate.likes + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url,
    }

    const updatedBlog = await blogService.update(id, newObject)

    dispatch(
      updateBlogs(
        blogs.map((blog) => (blog.id !== id ? blog : updatedBlog))
      )
    )
  }

  const handleDeleteBlog = async (id) => {
    console.log(id)
    if (window.confirm('Do you really want to delete the blog?')) {
      await blogService.deleteBlog(id)
      dispatch(updateBlogs(blogs.filter((blog) => blog.id !== id)))
      navigate('/')
    }
  }

  const handleComment = async (event) => {

    console.log('%cBlogDetail.js line:51 event', 'color: #007acc;', event)
    event.preventDefault()

    const commentObject = {
      comment: comment,
    }

    await blogService.createComment(matchedBlog.id, commentObject)
    setComment('')
  }

  if (!matchedBlog) {
    return null
  }

  return (
    <div>
      <div>
        <Typography variant="h6">
          {matchedBlog.title} by {matchedBlog.author}
        </Typography>
        <a href={matchedBlog.url}>{matchedBlog.url}</a> <br />
        <span id="likes">{matchedBlog.likes}</span>
        <Button
          id="like-button"
          onClick={() => handleUpdateLike(matchedBlog.id)}
        >
          like
        </Button>{' '}
        <br />
        added by {matchedBlog.user !== undefined
          ? matchedBlog.user.name
          : ''}{' '}
        <br />
        <Button
          color ="secondary"
          id="delete-button"
          onClick={() => handleDeleteBlog(matchedBlog.id)}
        >
          remove
        </Button>
      </div>
      <div>
        <Typography variant="h6">Comments</Typography>
        <form onSubmit={(event) => handleComment(event)}>
          <TextField
            id="comment-input"
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <Button
            id="comment-button"
            type="onSubmit">
            add comment
          </Button>
        </form>
        <ul>
          {matchedBlog.comments
            ? matchedBlog.comments.map((comment) => (
                <li key={comment.id}>{comment.comment}</li>
              ))
            : null}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetail
