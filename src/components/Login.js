import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const Login = ({ setUser = () => {}}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = loginService;
  const { setToken } = blogService;

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await login({ username, password });
    if (response) {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response));
      setToken(response.token);
      setUser(response);
      setUsername('');
      setPassword('');
    }
  };
  
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;