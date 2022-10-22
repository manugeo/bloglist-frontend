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
      // Note: 'navigate' can't be used when component first renders. Instead, it should be in an 'effect'.
      navigate('/users');
    }
  }, [user]);

  const { blogs, name } = user;

  return user ? (
    <div>
      <h2>{name}</h2>
      <h4>Added Blogs:</h4>
      {blogs.map((blog, i) => <p key={blog.id}>{`${i + 1}. ${blog.title}`}</p>)}
    </div>
  ) : null;
};

export default UserDetails;