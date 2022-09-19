import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Users from './components/Users';
import { logoutUser } from './reducers/currentUserReducer';

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, notificationMessage } = useSelector(state => state);
  const logout = () => dispatch(logoutUser());

  return (
    <Router>
      <Routes>
        {(currentUser === null)
          ? <>
            <Route path='/login' element={<Login notificationMessage={notificationMessage} />} />
            <Route path='*' element={<Navigate to={'/login'} />} />
          </>
          : <>
            <Route path='/users' element={<Users />} />
            <Route path='/' element={<Home logout={logout} />} />
            <Route path='*' element={<Navigate to={'/'} />} />
          </>}

      </Routes>
    </Router>
  );
};

export default App;
