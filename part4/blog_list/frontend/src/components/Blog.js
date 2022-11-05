import { useState } from 'react';

const Blog = ({ blog, onLike }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisible = () => {
    setDetailsVisible(!detailsVisible);
  };

  const toggleButtonText = detailsVisible ? 'hide' : 'view';
  const detailsStyle = { display: detailsVisible ? 'block' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={toggleDetailsVisible}>{toggleButtonText}</button>
      <div style={detailsStyle}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={onLike}>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>
  );
};

export default Blog;
