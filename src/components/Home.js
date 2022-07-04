import { useState, useEffect } from 'react';
import Blog from './Blog';
import blogsService from '../services/blogs';
const Home = ({ user = null, logout = () => { } }) => {
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const { getAll, createBlog } = blogsService;
  useEffect(() => {
    if (user !== null) {
      getAll().then(blogs => setBlogs(blogs));
    }
  }, [user, getAll]);

  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {setNotificationMessage(null)}, 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { blog, error } = await createBlog({ title, author, url });
    if (blog === null) {
      showNotification(error);
    } else {
      setBlogs([...blogs, blog]);
      showNotification("Blog created successfully!");
    };
  };

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
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default Home;