/* eslint-disable indent */
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { showErrorNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const initUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    var user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userService.setToken(user.token)
    }
    dispatch({
      type: 'INIT',
      data: user,
    })
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    } catch (e) {
      dispatch(showErrorNotification('wrong username or password'))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT',
      data: null,
    })
  }
}

export default loginReducer
