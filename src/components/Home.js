import { useState, useEffect } from 'react';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import blogsService from '../services/blogs';
const Home = ({ user = null, logout = () => { } }) => {
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const { getAll } = blogsService;
  useEffect(() => {
    if (user !== null) {
      getAll().then(blogs => setBlogs(blogs));
    }
  }, [user, getAll]);

  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => { setNotificationMessage(null) }, 3000);
  };

  const addNewBlog = (blog) => setBlogs([...blogs, blog]);

  return (
    <div>
      <h2>Blogs</h2>
      {user && (
        <>
          <h5>{user.name} logged-in</h5>
          <button type='button' onClick={logout}>log-out</button>
        </>
      )}
      {notificationMessage && <p>{notificationMessage}</p>}
      {!isCreateVisible
        ? <div><button type='button' onClick={() => setIsCreateVisible(true)}>Create new</button></div>
        : <CreateBlog showNotification={showNotification} onCreateSuccess={addNewBlog} setIsCreateVisible={setIsCreateVisible} />}
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default Home;