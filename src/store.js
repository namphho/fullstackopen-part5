import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
  login: loginReducer,
  blogs: blogReducer,
  notification: notificationReducer,
  users: userReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
