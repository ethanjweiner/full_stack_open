import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((blog1, blog2) => blog2.likes - blog1.likes)
  );

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
