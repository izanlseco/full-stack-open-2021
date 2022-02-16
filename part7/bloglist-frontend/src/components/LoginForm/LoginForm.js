import { Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from '../Notification'
import blogService from '../../services/blogs'
import loginService from '../../services/login'
import { setUser } from '../../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const message = useSelector((state) => state.notifications)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username,
      password,
    })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    blogService.setToken(user.token)

    dispatch(setUser(user))

    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <Notification message={message} />
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id="username"
            type="text"
            value={username}
            name="Username"
            label="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            id="password"
            type="password"
            value={password}
            name="Password"
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button color="primary" id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
