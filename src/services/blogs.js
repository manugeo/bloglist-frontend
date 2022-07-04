import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;
const setToken = (t) => {
  token = `bearer ${t}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
}

const createBlog = async (data = null) => {
  const config = {
    headers: { Authorization: token }
  };
  try {
    const response = await axios.post(baseUrl, data, config);
    return response.data;
  } catch (error) {
    console.log(error?.response?.data || error);
    return null;
  }
};

const blogsService = { getAll, createBlog, setToken };
export default blogsService;