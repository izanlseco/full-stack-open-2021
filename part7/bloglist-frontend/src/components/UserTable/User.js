import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core'

import React from 'react'
import { useMatch } from 'react-router-dom'

const User = ({ blogs }) => {
  const matchByUser = useMatch('/users/:id')
  const blogsByUser = matchByUser
    ? blogs.filter((blog) => blog.user.id === matchByUser.params.id)
    : null

  if (!blogs[0]) {
    return null
  }

  return (
    <div>
      <Typography variant="h4">{blogs[0].user.name}</Typography>
      <Typography variant="h5">Added blogs</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <List dense={true}>
            {blogsByUser.map((blog) =>
              <ListItem key={blog.id}>
                <ListItemText primary={blog.title} />
              </ListItem>)}
          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default User
