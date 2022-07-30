import { useState, useEffect } from 'react';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import blogsService from '../services/blogs';
const Home = ({ user = null, notificationMessage = null, showNotification = () => {}, logout = () => { } }) => {
  const [blogs, setBlogs] = useState([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const { getAll, updateBlogById, deleteBlogById } = blogsService;
  useEffect(() => {
    if (user !== null) {
      getAll().then(blogs => setBlogs(blogs));
    }
  }, [user, getAll]);

  const addNewBlog = (blog) => setBlogs([...blogs, blog]);
  const handleBlogLike = async (blogToLike) => {
    const { id, likes } = blogToLike || {};
    setBlogs(blogs.map(blog => {
      blog.isLiking = (blog.id === id);
      return blog;
    }));
    const response = await updateBlogById(id, { likes: (likes + 1) });
    if (response.blog === null) {
      showNotification(response.error);
      setBlogs(blogs.map(blog => {
        blog.isLiking = false;
        return blog;
      }));
    } else {
      const likedBlog = response.blog;
      setBlogs(blogs.map(blog => (blog.id === likedBlog.id) ? likedBlog : blog));
    }
  };

  const handleBlogRemove = async (blogToRemove) => {
    const response = await deleteBlogById(blogToRemove.id);
    if (response.success) {
      setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id));
      showNotification('Blog deleted successfully!');
    } else {
      showNotification(response.error);
    }
  };

  // Note: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters
  const compareBlogLikes = (a, b) => {
    if (a.likes === b.likes) return 0;
    return (a.likes > b.likes) ? -1 : 1;
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
      {!isCreateVisible
        ? <div><button type='button' onClick={() => setIsCreateVisible(true)}>Create new</button></div>
        : <CreateBlog showNotification={showNotification} onCreate={addNewBlog} setIsCreateVisible={setIsCreateVisible} />}
      {blogs.sort(compareBlogLikes).map(blog => <Blog key={blog.id} blog={blog} onLike={() => handleBlogLike(blog)}
        onRemove={() => handleBlogRemove(blog)} />)}
    </div>
  );
};

export default Home;