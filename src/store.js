import { configureStore } from '@reduxjs/toolkit';
import isCreateVisibleReducer from './reducers/isCreateVisibleReducer';
import blogsReducer from './reducers/blogsReducer';
import notificationMessageReducer from './reducers/notificationMessageReducer';

const store = configureStore({
  reducer: {
    isCreateVisible: isCreateVisibleReducer,
    blogs: blogsReducer,
    notificationMessage: notificationMessageReducer
  }
});

export default store;