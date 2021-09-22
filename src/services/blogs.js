import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  console.log(newToken);
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const newBlog = { ...blog, likes: blog.likes + 1 };
  console.log(newBlog);
  const reponse = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config);
  return reponse.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${blog.id}`, config);
}

const exportedFunctions = {
  getAll,
  setToken,
  createBlog,
  likeBlog,
  deleteBlog,
};

export default exportedFunctions;
