import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageType('error')
      setMessage('Wrong user or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleReset = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)

    setMessageType('info')
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    setBlogs(blogs.concat(returnedBlog))
  }

  const handleUpdateLike = async (id) => {
    const blogToUpdate = blogs.find(b => b.id === id)

    const newObject = {
      user: blogToUpdate.user,
      likes: blogToUpdate.likes + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url,
    }

    const updatedBlog = await blogService.update(id, newObject)

    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
  }

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Do you really want to delete the blog?')){
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const loginForm = () => (
    <div>
      <Notification
        type={messageType}
        message={message}
      />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification
        type={messageType}
        message={message}
      />
      <form onSubmit={handleReset}>
        <p>{user.name} logged-in<button id="logout-button" type="submit">logout</button></p>
      </form>
      <h2>create new</h2>
      <Togglable
        id='new-blog'
        buttonLabel='create new blog'
        ref={blogFormRef}
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => a.likes < b.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            like={() => handleUpdateLike(blog.id)}
            deleteBlog={() => handleDeleteBlog(blog.id)}
          />
        )}
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App
