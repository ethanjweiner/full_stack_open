import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
