import blogsService from '../services/blogs';
import { showNotification } from './notificationMessageReducer';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return [...action.blogs];
      case 'ADD_BLOG':
        return [...state, action.blog];
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
    const blogs = await blogsService.getAll();
    dispatch({ type: 'SET_BLOGS', blogs });
  };
};

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    const { blog, error } = await blogsService.createBlog({ title, author, url });
    if (blog === null) {
      dispatch(showNotification(error));
    } else {
      dispatch({ type: 'ADD_BLOG', blog });
      // clearForm();
      dispatch(showNotification('Blog created successfully!'));
    }
  };
};

export default blogsReducer;