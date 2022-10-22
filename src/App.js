import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Users from './components/Users';
import BlogDetails from './components/BlogDetails';
import UserDetails from './components/UserDetails';
import { logoutUser } from './reducers/currentUserReducer';

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, notificationMessage } = useSelector(state => state);
  const logout = () => dispatch(logoutUser());

  return (
    <Router>
      {currentUser && (
        <div>
          <Link to={'/'} style={{ padding: 5 }}>Blogs</Link>
          <Link to={'/users'} style={{ padding: 5 }}>Users</Link>
          <span style={{ padding: 5 }}>{currentUser.name} logged-in</span>
          <button type='button' onClick={logout}>log-out</button>
        </div>
      )}

      {notificationMessage && <p>{notificationMessage}</p>}

      <Routes>
        {(currentUser === null)
          ? <>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to={'/login'} />} />
          </>
          : <>
            <Route path='/blogs/:id' element={<BlogDetails />} />
            <Route path='/users/:id' element={<UserDetails />} />
            <Route path='/users' element={<Users />} />
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Navigate to={'/'} />} />
          </>}
      </Routes>
    </Router>
  );
};

export default App;
