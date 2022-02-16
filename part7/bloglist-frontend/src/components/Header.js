import{
  AppBar,
  Button,
  Toolbar,
  Typography
} from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'

import Notification from './Notification'
import React from 'react'
import { resetUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const Header = ({ message, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleReset = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(resetUser())
    navigate('/login')
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user ? user.name : null} logged-in
          <Button id="logout-button" onClick={() => handleReset()}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h5">Blog app</Typography>
      <Notification message={message} />
    </div>
  )
}

export default Header
