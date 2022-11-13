import './styles.css';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Alert from './components/Alert';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';
import { initializeBlogs } from './store/blogs';
import BlogList from './components/BlogList';
import { logoutUser, tryLoadUser } from './store/user';

const App = () => {
  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.user);

  // Initialize blogs in store
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  // Load user on load
  useEffect(() => {
    dispatch(tryLoadUser());
  }, [dispatch]);

  // Blog form visibility
  const togglableBlogForm = useRef();

  const setBlogFormVisibility = (visibility) => {
    togglableBlogForm.current.setVisible(visibility);
  };

  return (
    <div>
      <Alert />
      {activeUser === null ? (
        <div>
          <Login />
          <BlogList />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {activeUser.name} logged in
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
          </p>

          <Togglable buttonName="new blog" ref={togglableBlogForm}>
            <CreateBlogForm onCreate={() => setBlogFormVisibility(false)} />
          </Togglable>

          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
