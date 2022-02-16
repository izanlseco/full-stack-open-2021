import { Alert } from '@material-ui/lab'
import React from 'react'
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      {(message &&
        <Alert severity="success">
          {message}
        </Alert>)}
    </div>
  )
}

export default Notification
