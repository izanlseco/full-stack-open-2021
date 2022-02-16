import {
  Button,
  TextField
} from '@material-ui/core'
import React, { useRef, useState } from 'react'

import Togglable from '../../Togglable'
import { createBlog } from '../../../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    dispatch(createBlog(blogObject))
    blogFormRef.current.toggleVisibility()

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <Togglable id="new-blog" buttonLabel="create new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            id="title"
            type="text"
            value={newTitle}
            name="Title"
            label="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            id="author"
            type="text"
            value={newAuthor}
            name="Author"
            label="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            id="url"
            type="text"
            value={newUrl}
            name="Url"
            label="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <Button id="create-blog" type="onSubmit">
          create
        </Button>
      </form>
    </Togglable>
  )
}

export default BlogForm
