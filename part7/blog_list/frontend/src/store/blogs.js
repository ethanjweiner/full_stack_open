import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';
import { notify, notifyError } from './notification';

// To address:
// - Sort blogs in store or immediately pre-render?

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const { id, newBlog } = action.payload;
      const blogIndex = state.findIndex((blog) => blog.id === id);
      state[blogIndex] = newBlog;
    },
  },
});

const { setBlogs, appendBlog, updateBlog } = blogsSlice.actions;

// Thunk action creators

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogsService.getAll();
  dispatch(setBlogs(blogs));
};

export const addBlog = (blogData, successHandler) => async (dispatch) => {
  try {
    const newBlog = await blogsService.add(blogData);
    dispatch(appendBlog(newBlog));
    dispatch(notify('added blog', 'success'));
    successHandler();
  } catch (error) {
    dispatch(notifyError(error.message));
  }
};

export const likeBlog = (blogId) => async (dispatch, getState) => {
  try {
    const { blogs } = getState();
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);
    const newBlog = await blogsService.update(blogToUpdate.id, {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    });
    dispatch(updateBlog({ id: newBlog.id, newBlog }));
    dispatch(notify('added blog', 'success'));
  } catch (error) {
    dispatch(notifyError(error.message));
  }
};

export default blogsSlice.reducer;
