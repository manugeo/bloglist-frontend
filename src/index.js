import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
