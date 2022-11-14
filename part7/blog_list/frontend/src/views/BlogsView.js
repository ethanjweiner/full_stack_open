import { useRef } from 'react';
import { useSelector } from 'react-redux';
import CreateBlogForm from '../components/CreateBlogForm';
import Togglable from '../components/Togglable';
import BlogList from '../components/BlogList';

const BlogsView = () => {
  const activeUser = useSelector((state) => state.user);

  // Blog form visibility
  const togglableBlogForm = useRef();

  const setBlogFormVisibility = (visibility) => {
    togglableBlogForm.current.setVisible(visibility);
  };

  if (activeUser === null) {
    return null;
  }

  return (
    <div>
      <Togglable buttonName="new blog" ref={togglableBlogForm}>
        <CreateBlogForm onCreate={() => setBlogFormVisibility(false)} />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default BlogsView;
