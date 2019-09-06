const initialState = { userData: [] }

function userLogIn(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'USER_LOGIN':
      nextState = {
        ...state,
        userData: action.value
      }
      return nextState

  default:
    return state
  }
}

export default userLogIn;