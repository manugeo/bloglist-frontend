import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './reducers/currentUserReducer';
import isCreateVisibleReducer from './reducers/isCreateVisibleReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationMessageReducer from './reducers/notificationMessageReducer';

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    isCreateVisible: isCreateVisibleReducer,
    blogs: blogsReducer,
    notificationMessage: notificationMessageReducer
  }
});

export default store;