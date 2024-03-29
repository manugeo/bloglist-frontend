import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initializeUsers } from '../reducers/usersReducer';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notificationMessage, users } = useSelector(state => state);

  useEffect(() => {
    if (!(users && users.length)) dispatch(initializeUsers());
  }, [users]);

  console.log(users);

  const onUserClick = (user) => navigate(`/users/${user.id}`);

  return (
    <div>
      <h2>Users</h2>
      {notificationMessage && <p>{notificationMessage}</p>}

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <tr key={user.id}>
            <td><span style={{ cursor: 'pointer' }} onClick={() => onUserClick(user)}>{user.name}</span></td>
            <td>{user?.blogs?.length || '-'}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default Users;