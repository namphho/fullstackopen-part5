/* eslint-disable indent */
import userService from '../services/users'
import { showErrorNotification } from './notificationReducer'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_USER':
      return action.data
    default:
      return state
  }
}

export const getAllUser = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: 'GET_ALL_USER',
        data: users,
      })
    } catch (e) {
      dispatch(showErrorNotification(e.message))
    }
  }
}

export default userReducer
