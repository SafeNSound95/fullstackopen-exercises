import { useReducer, createContext } from "react"

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION': {
      return action.payload
    }

    default: return state
  }
}

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = ({ children }) => {
  const [ notification, notificationDispatch ] = useReducer( notificationReducer, "")

  return (
  <NotificationContext.Provider value = {[ notification, notificationDispatch ]}>
    {children}
  </NotificationContext.Provider>)
}
