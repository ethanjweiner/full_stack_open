import { useState } from 'react';
import PropTypes from 'prop-types';

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
      <div data-testid="details" style={detailsStyle}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button data-testid="like-button" onClick={onLike}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }),
  onLike: PropTypes.func.isRequired,
};

export default Blog;
