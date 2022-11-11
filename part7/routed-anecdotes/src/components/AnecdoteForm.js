import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const AnecdoteForm = (props) => {
  const contentField = useField('content', 'text');
  const authorField = useField('author', 'text');
  const infoField = useField('info', 'text');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: contentField.attributes.value,
      author: authorField.attributes.value,
      info: infoField.attributes.value,
      votes: 0,
    });

    navigate('/');
  };

  const handleReset = (e) => {
    e.preventDefault();
    contentField.reset();
    authorField.reset();
    infoField.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField.attributes} />
        </div>
        <div>
          author
          <input {...authorField.attributes} />
        </div>
        <div>
          url for more info
          <input {...infoField.attributes} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
