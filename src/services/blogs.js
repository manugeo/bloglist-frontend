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

const blogsService = { getAll, setToken };
export default blogsService;