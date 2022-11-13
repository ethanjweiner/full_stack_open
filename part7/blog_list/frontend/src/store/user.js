import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { notify, notifyError } from './notification';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

const { setUser, removeUser } = userSlice.actions;

// Thunks

const loadUser = (userData, dispatch) => {
  blogService.setToken(userData.token);
  dispatch(setUser(userData));
};

export const tryLoadUser = () => (dispatch) => {
  const savedUser = JSON.parse(window.localStorage.getItem('user'));
  if (savedUser) loadUser(savedUser, dispatch);
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const userData = await loginService.login(credentials);
    loadUser(userData, dispatch);
    window.localStorage.setItem('user', JSON.stringify(userData));
    dispatch(notify('logged in', 'success'));
  } catch (error) {
    dispatch(notifyError('wrong username or password'));
  }
};

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem('user');
  dispatch(removeUser());
};

export default userSlice.reducer;
