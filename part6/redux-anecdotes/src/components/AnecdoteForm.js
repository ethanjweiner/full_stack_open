import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    dispatch(createAnecdote(content));
    e.target.content.value = '';
    dispatch(setNotification(`new anecdote '${content}'`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
