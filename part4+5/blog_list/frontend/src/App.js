import './styles.css';
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import Alert from './components/Alert';
import CreateBlogForm from './components/CreateBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);

  const loadUser = (userData) => {
    setUser(userData);
    blogService.setToken(userData.token);
  };

  useEffect(() => {
    blogService.getAll().then((blogData) => setBlogs(blogData));
  }, []);

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem('user'));
    if (savedUser) loadUser(savedUser);
  }, []);

  // Sort blogs
  blogs.sort((blog1, blog2) => blog2.likes - blog1.likes);

  const displayNotification = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(null), 5000);
  };

  // Authentication
  const login = async (credentials) => {
    try {
      const userData = await loginService.login(credentials);
      loadUser(userData);
      window.localStorage.setItem('user', JSON.stringify(userData));
      displayNotification({
        message: 'logged in',
        type: 'success',
      });
    } catch (error) {
      displayNotification({
        message: 'wrong username or password',
        type: 'error',
      });
    }
  };

  const logout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const togglableBlogForm = useRef();

  const addBlog = async (blogData) => {
    try {
      const blog = await blogService.add(blogData);
      setBlogs(blogs.concat(blog));
      displayNotification({
        message: 'added blog',
        type: 'success',
      });
      togglableBlogForm.current.setVisible(false);
    } catch (error) {
      displayNotification({
        message: error.message,
        type: 'error',
      });
    }
  };

  const likeBlog = async (blogData) => {
    const { id } = blogData;

    try {
      const newBlog = await blogService.update(blogData.id, {
        ...blogData,
        likes: blogData.likes + 1,
      });
      setBlogs(blogs.map((blog) => (blog.id === id ? newBlog : blog)));
      displayNotification({
        message: 'updated blog',
        type: 'success',
      });
    } catch (error) {
      displayNotification({
        message: error.message,
        type: 'error',
      });
    }
  };

  const blogsList = (
    <div className="blog-list">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onLike={() => likeBlog(blog)} />
      ))}
    </div>
  );

  return (
    <div>
      <Alert alert={alert} />
      {user === null ? (
        <div>
          <Login onLogin={login} />
          {blogsList}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in<button onClick={logout}>Logout</button>
          </p>

          <Togglable buttonName="new blog" ref={togglableBlogForm}>
            <CreateBlogForm onCreate={addBlog} />
          </Togglable>

          {blogsList}
        </div>
      )}
    </div>
  );
};

export default App;
