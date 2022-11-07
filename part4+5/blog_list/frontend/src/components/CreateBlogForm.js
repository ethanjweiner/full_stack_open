const { useState } = require('react');

const CreateBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
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
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
