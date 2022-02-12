import React from 'react'

const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  if (type === 'info') {
    return (
      <div className='info'>
        {message}
      </div>
    )
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default Notification