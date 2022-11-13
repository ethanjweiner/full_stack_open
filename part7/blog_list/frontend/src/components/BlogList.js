import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
