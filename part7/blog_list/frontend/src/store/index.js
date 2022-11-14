import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notification';
import blogsReducer from './blogs';
import userReducer from './user';
import usersReducer from './users';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
