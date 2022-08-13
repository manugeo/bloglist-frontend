import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import { initializeBlogs } from '../reducers/blogsReducer';
import blogsService from '../services/blogs';
import { isCreateVisibleChange } from '../reducers/isCreateVisibleReducer';
const Home = ({ user = null, notificationMessage = null, showNotification = () => { }, logout = () => { } }) => {
  const { isCreateVisible, blogs } = useSelector(state => state);

  // Todo: Update handleBlogLike and handleBlogRemove methods to use the redux store.
  // Note: These two methods won't work now.

  // const [blogs, setBlogs] = useState([]);
  const setBlogs = () => { };

  const dispatch = useDispatch();
  const { deleteBlogById } = blogsService;
  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs());
    }
  }, [user]);

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
        ? <div><button type='button' onClick={() => dispatch(isCreateVisibleChange(true))}>Create new</button></div>
        : <CreateBlog setIsCreateVisible={(isVisible) => dispatch(isCreateVisibleChange(isVisible))} />}
      {blogs.slice().sort(compareBlogLikes).map(blog => <Blog key={blog.id} blog={blog}
        onRemove={() => handleBlogRemove(blog)} />)}
    </div>
  );
};

export default Home;