import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import BlogDetail from './components/Blog/BlogDetail/BlogDetail'
import BlogList from './components/Blog/BlogList/BlogList'
import Container from '@material-ui/core/Container'
import Header from './components/Header'
import LoginForm from './components/LoginForm/LoginForm'
import User from './components/UserTable/User'
import UserTable from './components/UserTable/UserTable'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser } from './reducers/loginReducer'

const App = () => {
  const login = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)
  const message = useSelector((state) => state.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <Container>
      <Router>
        <Routes>
          <Route
            path="/users/:id"
            element={
              <>
                {login ? <Header message={message} user={login} /> : null}
                <User blogs={blogs} />
              </>
            }/>
          <Route
            path="/users"
            element={
              <>
                {login ? <Header message={message} user={login} /> : null}
                <UserTable users={users} />
              </>
            }/>
          <Route
            path="/blogs/:id"
            element={
              <>
                {login ? <Header message={message} user={login} /> : null}
                <BlogDetail blogs={blogs} />
              </>
            }/>
          <Route
            path="/login"
            element={
              <>
                <LoginForm />
              </>
            }/>
          <Route
            path="/"
            element={
              <>
                {login ? <Header message={message} user={login} /> : null}
                <BlogList blogs={blogs} />
              </>
            }/>
        </Routes>
      </Router>
    </Container>
  )
}

export default App
