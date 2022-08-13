import blogsService from '../services/blogs';
import { showNotification } from './notificationMessageReducer';

const { getAll, createBlog: createBlogService, updateBlogById, deleteBlogById } = blogsService;

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return [...action.blogs];
    case 'ADD_BLOG':
      return [...state, action.blog];
    case 'REPLACE_BLOG':
      return state.map(blog => (blog.id === action.blog.id) ? action.blog : blog);
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.blog.id);
    case 'SET_BLOG_IS_LIKING':
      return state.map(blog => {
        return (blog.id === action.blog.id) ? { ...blog, isLiking: action.isLiking } : blog;
      });
    default:
      return state;
  }
};

// Note: In the same way that Redux code normally uses action creators to generate action objects for dispatching
// instead of writing action objects by hand, we normally use thunk action creators to generate the thunk functions that are dispatched.
// A thunk action creator is a function that may have some arguments, and returns a new thunk function.
// See: https://redux.js.org/usage/writing-logic-thunks#writing-thunks

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll();
    dispatch({ type: 'SET_BLOGS', blogs });
  };
};

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const { blog, error } = await createBlogService({ title, author, url });
    if (blog === null) {
      dispatch(showNotification(error));
    } else {
      dispatch({ type: 'ADD_BLOG', blog });
      // clearForm();
      dispatch(showNotification('Blog created successfully!'));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const { id, likes } = blog || {};
    dispatch({ type: 'SET_BLOG_IS_LIKING', blog, isLiking: true });
    const response = await updateBlogById(id, { likes: (likes + 1) });
    if (response.blog === null) {
      dispatch(showNotification(response.error));
      dispatch({ type: 'SET_BLOG_IS_LIKING', blog, isLiking: false });
    } else {
      const likedBlog = response.blog;
      dispatch({ type: 'REPLACE_BLOG', blog: likedBlog });
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const response = await deleteBlogById(blog.id);
    if (response.success) {
      dispatch({ type: 'REMOVE_BLOG', blog });
      dispatch(showNotification('Blog deleted successfully!'));
    } else {
      dispatch(showNotification(response.error));
    }
  };
};

export default blogsReducer;