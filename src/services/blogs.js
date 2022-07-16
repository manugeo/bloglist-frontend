import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
const setToken = (t) => {
  token = `bearer ${t}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.get(baseUrl, config);
  const blogs = response.data.map(data => {
    data.isLiking = false;
    return data;
  });
  return blogs;
};

const createBlog = async (data = null) => {
  const config = {
    headers: { Authorization: token }
  };
  try {
    const response = await axios.post(baseUrl, data, config);
    return { blog: response.data };
  } catch (error) {
    return { blog: null, error: error?.response?.data?.error || 'Failed to create new blog!' };
  }
};

const updateBlogById = async (id, data = null) => {
  const config = {
    headers: { Authorization: token }
  };

  try {
    const response = await axios.put(`${baseUrl}/${id}`, data, config);
    const updatedBlog = response.data ? { ...response.data, isLiking: false } : null;
    return { blog: updatedBlog };
  } catch (error) {
    return { blog: null, error: error?.response?.data?.error || 'Failed to update the blog!' };
  }
};

const deleteBlogById = async (id) => {
  const config = {
    headers: { Authorization: token }
  };

  try {
    await axios.delete(`${baseUrl}/${id}`, config);
    return { success: true };
  } catch (error) {
    return { error: error?.response?.data?.error || 'Failed to delete the blog!' };
  }
};

const blogsService = { setToken, getAll, createBlog, updateBlogById, deleteBlogById };
export default blogsService;