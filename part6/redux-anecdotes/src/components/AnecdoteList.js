import { useDispatch, useSelector } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  let anecdotes = useSelector((state) => state.anecdotes);
  let filter = useSelector((state) => state.filter);

  anecdotes = [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .filter(({ content }) =>
      content.toLowerCase().includes(filter.toLowerCase())
    );

  const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    dispatch(voteForAnecdote(id));
    dispatch(setNotification(`you voted '${content}'`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
