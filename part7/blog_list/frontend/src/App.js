import './styles.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Alert from './components/Alert';
import { initializeBlogs } from './store/blogs';
import { initializeUsers } from './store/users';
import { tryLoadUser } from './store/user';
import BlogsView from './views/BlogsView';
import UsersView from './views/UsersView';
import UserView from './views/UserView';
import BlogView from './views/BlogView';
import Login from './components/Login';
import NavigationMenu from './components/NavigationMenu';

const App = () => {
  const dispatch = useDispatch();

  // Initialize blogs in store
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  // Initialize users in store
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  // Load user on load
  useEffect(() => {
    dispatch(tryLoadUser());
  }, [dispatch]);

  const activeUser = useSelector((state) => state.user);

  return (
    <div>
      <Alert />
      {activeUser && <NavigationMenu />}
      <h2>blog app</h2>
      {activeUser === null && <Login />}
      <Routes>
        <Route path="/" element={<BlogsView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<UserView />} />
      </Routes>
    </div>
  );
};

export default App;
