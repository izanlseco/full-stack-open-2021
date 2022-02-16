const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTI':
      return action.data
    case 'CLEAR_NOTI':
      return null
    default:
      return state
  }
}

const clearInfo = () => {
  return {
    type: 'CLEAR_NOTI',
  }
}

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    await dispatch({
      type: 'SET_NOTI',
      data: message,
    })
    setTimeout(() => {
      dispatch(clearInfo())
    }, timeout * 1000)
  }
}

export default reducer
