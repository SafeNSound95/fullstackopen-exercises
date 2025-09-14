import { createSlice } from '@reduxjs/toolkit'

let timeoutId 

const notificationSlice = createSlice({
  name:'notification',
  initialState:null,
  reducers:{
    setNotificationText(state,action){
      return action.payload
    },
    clearNotification() {
      return null
    }
  }
})


const { setNotificationText, clearNotification } = notificationSlice.actions

export const setNotification = (message, duration = 5) => {
  return dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotificationText(message))

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, duration * 1000)
  }
}

export default notificationSlice.reducer