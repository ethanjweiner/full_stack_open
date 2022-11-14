import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_, action) {
      return action.payload;
    },
  },
});

const { setUsers } = usersSlice.actions;

// Thunks
export const initializeUsers = () => async (dispatch) => {
  try {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  } catch (error) {
    console.error(error);
  }
};

export default usersSlice.reducer;
