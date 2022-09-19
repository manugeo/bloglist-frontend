import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './reducers/currentUserReducer';
import isCreateVisibleReducer from './reducers/isCreateVisibleReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationMessageReducer from './reducers/notificationMessageReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    isCreateVisible: isCreateVisibleReducer,
    blogs: blogsReducer,
    notificationMessage: notificationMessageReducer,
    users: usersReducer
  }
});

export default store;