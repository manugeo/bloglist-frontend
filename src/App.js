import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Home from './components/Home';
import { showNotification } from './reducers/notificationMessageReducer';
import blogsService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const notificationMessage = useSelector(state => state.notificationMessage);
  const { setToken } = blogsService;

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedInUserJson) {
      const loggedInUser = JSON.parse(loggedInUserJson);
      setToken(loggedInUser.token);
      setUser(loggedInUser);
    }
  }, [setToken]);

  const showNotificationMessage = (message) => {
    dispatch(showNotification(message));
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  return (user === null)
    ? <Login notificationMessage={notificationMessage} showNotification={showNotificationMessage} setUser={setUser} />
    : <Home user={user} logout={logout} notificationMessage={notificationMessage} />;
};

export default App;
