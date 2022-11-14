import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../store/user';

const NavigationMenu = () => {
  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.user);
  const navStyle = {
    display: 'inline',
    background: 'rgb(200, 200, 200)',
    padding: '5px',
  };

  return (
    <div style={navStyle}>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {activeUser.name} logged in
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
    </div>
  );
};

export default NavigationMenu;
