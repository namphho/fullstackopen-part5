import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  console.log(newToken);
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const createBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};


export default { getAll, setToken, createBlog };
