import './styles.css';
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import Alert from './components/Alert';
import CreateBlogForm from './components/CreateBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem('user'));
    if (savedUser) loadUser(savedUser);
  }, []);

  const loadUser = (userData) => {
    setUser(userData);
    blogService.setToken(userData.token);
  };

  const displayNotification = (alert) => {
    setAlert(alert);
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

  const addBlog = async (blogData) => {
    try {
      const blog = await blogService.add(blogData);
      setBlogs(blogs.concat(blog));
      displayNotification({
        message: 'added blog',
        type: 'success',
      });
    } catch (error) {
      displayNotification({
        message: error.message,
        type: 'error',
      });
    }
  };

  return (
    <div>
      <Alert alert={alert} />
      {user === null ? (
        <Login onLogin={login} />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in<button onClick={logout}>Logout</button>
          </p>

          <CreateBlogForm onSubmit={addBlog} />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
