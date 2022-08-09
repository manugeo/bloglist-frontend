import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import isCreateVisibleReducer from './reducers/isCreateVisibleReducer';

const store = configureStore({
  reducer: {
    isCreateVisible: isCreateVisibleReducer
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
