import React, { useState } from 'react'
const Blog = ({ blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes}{' '}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>author: {blog.author}</div>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
