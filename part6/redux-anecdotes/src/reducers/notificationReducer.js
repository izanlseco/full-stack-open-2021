import { createSlice } from "@reduxjs/toolkit"

let timeoutID;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return null
    }
  }
})

export const { clearNotification, setNotification } = notificationSlice.actions

export const addNotification = (message, timeout) => {
  return async dispatch => {
    await dispatch(setNotification(message))
    
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer