import { useState, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const { setToken } = blogService;

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedInUserJson) {
      const loggedInUser = JSON.parse(loggedInUserJson);
      setToken(loggedInUser.token);
      setUser(loggedInUser);
    }
  }, [setToken]);

  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => { setNotificationMessage(null); }, 3000);
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  return (user === null)
    ? <Login notificationMessage={notificationMessage} showNotification={showNotification} setUser={setUser} />
    : <Home user={user} logout={logout} notificationMessage={notificationMessage} showNotification={showNotification} />;
};

export default App;
