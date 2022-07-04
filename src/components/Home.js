import { useState, useEffect } from 'react';
import Blog from './Blog';
import blogsService from '../services/blogs';
const Home = ({ user = null }) => {
  const [blogs, setBlogs] = useState([]);
  const { getAll } = blogsService;
  useEffect(() => {
    if (user !== null) {
      getAll().then(blogs => setBlogs(blogs));
    }
  }, [user, getAll]);

  return (
    <div>
      {user && <h3>{user.name} logged-in</h3>}
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default Home;