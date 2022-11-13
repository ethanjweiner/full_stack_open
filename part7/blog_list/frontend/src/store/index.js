import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notification';
import blogsReducer from './blogs';
import userReducer from './user';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});

export default store;
