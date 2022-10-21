import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(state => state.users.find(u => (u.id === id)) || null);

  console.log({ id, user });

  useEffect(() => {
    if (user === null) {
      // Note: 'navigate' can't be used when component first renders. Instead, it should be in a 'effect'.
      navigate('/users');
    }
  }, [user]);

  return user ? (
    <div>User Details!</div>
  ) : null;
};

export default UserDetails;