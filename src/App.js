import { useState, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const { setToken } = blogService;

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedInUserJson) {
      const loggedInUser = JSON.parse(loggedInUserJson);
      setToken(loggedInUser.token);
      setUser(loggedInUser);
    }
  }, [setToken]);

  return (user === null) ? <Login setUser={setUser} /> : <Home user={user} />;
}

export default App
