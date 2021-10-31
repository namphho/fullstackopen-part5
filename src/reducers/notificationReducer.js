const initializeNotification = {
  msg: null,
  isError: null,
}

const notificationReducer = (state = initializeNotification, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.data
  case 'HIDE':
    return initializeNotification
  default:
    return state
  }
}

export const showErrorNotification = (msg) => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW',
      data: {
        msg: msg,
        isError: true,
      },
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE',
      })
    }, 3000)
  }
}

export const showNotification = (msg) => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW',
      data: {
        msg: msg,
        isError: false,
      },
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE',
      })
    }, 3000)
  }
}

export default notificationReducer
