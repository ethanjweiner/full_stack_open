import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(_, action) {
      return action.payload;
    },

    removeNotification() {
      return '';
    },
  },
});

const { createNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => dispatch(removeNotification()), seconds * 1000);
  };
};

export default notificationSlice.reducer;
