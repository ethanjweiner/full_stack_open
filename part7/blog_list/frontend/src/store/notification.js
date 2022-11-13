import { createSlice } from '@reduxjs/toolkit';

const NOTIFICATION_TIME = 5000;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, type: null },
  reducers: {
    setNotification(state, action) {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type;
    },
    clearNotification(state) {
      state.message = null;
      state.type = null;
    },
  },
});

const { setNotification, clearNotification } = notificationSlice.actions;

// Thunk action creators
const notify = (message, type) => (dispatch) => {
  dispatch(setNotification({ message, type }));
  setTimeout(() => dispatch(clearNotification()), NOTIFICATION_TIME);
};

const notifyError = (message) => notify(message, 'error');

export { notify, notifyError };

export default notificationSlice.reducer;
