import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog } from '../store/blogs';

const BlogView = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const selectedBlog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  if (!selectedBlog) return null;

  return (
    <div>
      <h1>{selectedBlog.title}</h1>
      <div>
        <a href={selectedBlog.url}>{selectedBlog.url}</a>
      </div>
      <div>
        likes {selectedBlog.likes}
        <button
          data-testid="like-button"
          onClick={() => dispatch(likeBlog(selectedBlog.id))}
        >
          like
        </button>
      </div>
      <div>{selectedBlog.author}</div>
      <h3>comments</h3>
      <ul>
        {selectedBlog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
