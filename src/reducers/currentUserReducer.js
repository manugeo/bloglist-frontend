import blogsService from '../services/blogs';
import loginService from '../services/login';
import { showNotification } from './notificationMessageReducer';

const { setToken } = blogsService;
const { login } = loginService;

const loggedInUserJson = window.localStorage.getItem('loggedBlogAppUser');
const initialCurrentUser = loggedInUserJson ? JSON.parse(loggedInUserJson) : null;
if (initialCurrentUser) setToken(initialCurrentUser.token);

const currentUserReducer = (state = initialCurrentUser, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.user;
    case 'REMOVE_CURRENT_USER':
      return null;
    default:
      return state;
  }
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await login({ username, password });
    if (user === null) {
      dispatch(showNotification('There was an error logging user...'));
      return;
    }
    if (user) {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setToken(user.token);
      dispatch({ type: 'SET_CURRENT_USER', user });
    }
  };
};

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogAppUser');
  return { type: 'REMOVE_CURRENT_USER' };
};

export default currentUserReducer;