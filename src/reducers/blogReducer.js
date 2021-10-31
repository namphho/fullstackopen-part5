/* eslint-disable indent */
import blogService from '../services/blogs'
import { showErrorNotification, showNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL':
      return sortBlog(action.data)
    case 'DELETE': {
      const blog = action.data.blog
      const afterBlogs = state.filter((b) => b.id !== blog.id)
      return afterBlogs
    }
    case 'CREATE': {
      const newBlogs = state.concat(action.data)
      return newBlogs
    }
    case 'LIKE': {
      const likedBlog = action.data
      const newBlogs = state.map((e) => {
        if (e.id === likedBlog.id) {
          return likedBlog
        } else {
          return e
        }
      })
      return sortBlog(newBlogs)
    }
    default:
      return state
  }
}

const sortBlog = (blogs) => {
  return blogs.sort((x, y) => y.likes - x.likes)
}

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_ALL',
      data: blogs,
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog)
      dispatch({
        type: 'DELETE',
        data: {
          blog: blog,
        },
      })
    } catch (e) {
      showErrorNotification(e.message)
    }
  }
}

export const createBlog = (createBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createBlog(createBlog)
    dispatch({
      type: 'CREATE',
      data: createdBlog,
    })
    const msg = `a new blog ${createdBlog.title} by ${createdBlog.author}`
    dispatch(showNotification(msg))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.likeBlog(blog)
    dispatch({
      type: 'LIKE',
      data: likedBlog,
    })
  }
}

export default blogReducer
