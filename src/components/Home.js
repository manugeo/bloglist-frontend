import { useState, useEffect } from 'react';
import Blog from './Blog';
import blogsService from '../services/blogs';
const Home = ({ user = null, logout = () => {} }) => {
  const [blogs, setBlogs] = useState([]);
  const { getAll } = blogsService;
  useEffect(() => {
    if (user !== null) {
      getAll().then(blogs => setBlogs(blogs));
    }
  }, [user, getAll]);

  return (
    <div>
      <h2>Blogs</h2>
      {user && (
        <>
        <h5>{user.name} logged-in</h5>
        <button type='button' onClick={logout}>log-out</button>
        </>
      )}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default Home;