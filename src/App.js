import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, initUser } from './reducers/loginReducer'
import {
  getAllBlogs,
  deleteBlog,
  createBlog,
  likeBlog,
} from './reducers/blogReducer'
import { getAllUser } from './reducers/userReducer'
import UserView from './components/UserView'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => {
    return state.blogs
  })
  const notiBundle = useSelector((state) => {
    return state.notification
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (user !== null) {
      loadBlog()
    }
  }, [user])

  const loadBlog = () => {
    dispatch(getAllBlogs())
  }

  useEffect(() => {
    dispatch(initUser())
    dispatch(getAllUser())
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  const onLogoutClick = () => {
    dispatch(logout())
  }

  const onCreateBlog = async (blog) => {
    dispatch(createBlog(blog))
  }

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async (blog) => {
    const selected = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (selected) {
      dispatch(deleteBlog(blog))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2> log in to application </h2>
        <Notification message={notiBundle.msg} isError={notiBundle.isError} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notiBundle.msg} isError={notiBundle.isError} />
      <div>
        {user.name} logged it <button onClick={onLogoutClick}>logout</button>
      </div>
      <br></br>
      <br></br>
      <Togglable buttonLabel='create new blog'>
        <CreateForm onHandleCreate={onCreateBlog} />
      </Togglable>
      <br></br>
      <br></br>
      <UserView />
      <>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        ))}
      </>
    </div>
  )
}

export default App
