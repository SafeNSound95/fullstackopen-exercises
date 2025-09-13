const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'FILTER_WORD':
      return action.payload
    default:
      return state
  }
}

export const changeFilter = (word) => {
  return {
    type: 'FILTER_WORD',
    payload: word
  }
}

export default filterReducer