import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

const ancedotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(_, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const { id, newAnecdote } = action.payload;
      return state.map((anecdote) =>
        anecdote.id === id ? newAnecdote : anecdote
      );
    },
  },
});

const { appendAnecdote, setAnecdotes, updateAnecdote } = ancedotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.create(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(updateAnecdote({ id: newAnecdote.id, newAnecdote }));
  };
};

export default ancedotesSlice.reducer;
