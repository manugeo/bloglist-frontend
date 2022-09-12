import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Home from './components/Home';
import { logoutUser } from './reducers/currentUserReducer';

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, notificationMessage } = useSelector(state => state);
  const logout = () => dispatch(logoutUser());

  return (currentUser === null)
    ? <Login notificationMessage={notificationMessage} />
    : <Home user={currentUser} logout={logout} notificationMessage={notificationMessage} />;
};

export default App;
