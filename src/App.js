import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notiBundle, setNotifiBundle] = useState({
    msg: null,
    isError: null,
  });

  useEffect(() => {
    if (user !== null) {
      loadBlog();
    }
  }, [user]);

  const loadBlog = async () => {
    const blogs = await blogService.getAll();
    setBlogs(sortBlog(blogs));
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      alert(e);
      showNotificationMsg("wrong username or password", true);
    }
  };

  const onLogoutClick = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const onCreateBlog = async (blog) => {
    const createdBlog = await blogService.createBlog(blog);
    const newBlogs = blogs.concat(createdBlog);
    setBlogs(newBlogs);
    showNotificationMsg(
      `a new blog ${createdBlog.title} by ${createdBlog.author}`,
      false
    );
  };

  const showNotificationMsg = (msg, isError) => {
    setNotifiBundle({ msg, isError });
    setTimeout(() => {
      setNotifiBundle({ msg: null, isError: null });
    }, 3000);
  };

  const handleLike = async (blog) => {
    try {
      const updateBlog = await blogService.likeBlog(blog);
      console.log(updateBlog);
      const updateBlogs = blogs.map((b) => {
        if (b.id === blog.id) {
          return updateBlog;
        } else {
          return b;
        }
      });
      setBlogs(sortBlog(updateBlogs));
    } catch (e) {
      alert(e);
    }
  };

  const handleRemove = async (blog) => {
    const selected = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (selected) {
      try {
        await blogService.deleteBlog(blog);
        const afterBlogs = blogs.filter((b) => b.id !== blog.id);
        setBlogs(afterBlogs);
      } catch (e) {
        showNotificationMsg(e, true);
      }
    }
  };

  const sortBlog = (blogs) => {
    return blogs.sort((x, y) => y.likes - x.likes);
  };

  if (user === null) {
    return (
      <div>
        <h2> log in to application </h2>
        <Notification message={notiBundle.msg} isError={notiBundle.isError} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
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
      <Togglable buttonLabel="create new blog">
        <CreateForm onHandleCreate={onCreateBlog} />
      </Togglable>
      <br></br>
      <br></br>
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
  );
};

export default App;
