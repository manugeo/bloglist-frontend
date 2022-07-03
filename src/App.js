import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blogs, setBlogs] = useState([]);
  const { login } = loginService;
  const { getAll, setToken } = blogService;

  useEffect(() => {
    if (user !== null) {
      getAll().then(blogs => setBlogs(blogs));
    }
  }, [user, getAll]);

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedInUserJson) {
      const loggedInUser = JSON.parse(loggedInUserJson);
      setToken(loggedInUser.token);
      setUser(loggedInUser);
    }
  }, [setToken]);

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
    (user === null)
      ? <div>
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
      :
      <div>
        <h3>{user.name} logged-in</h3>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )
}

export default App
