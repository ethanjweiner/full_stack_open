import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addBlog } from '../store/blogs';

const CreateBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addBlog({ title, author, url }, onCreate));
    resetForm();
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={title}
            name="title"
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            name="author"
            value={author}
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            name="url"
            value={url}
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
