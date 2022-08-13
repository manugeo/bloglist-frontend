import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import { initializeBlogs } from '../reducers/blogsReducer';
import { isCreateVisibleChange } from '../reducers/isCreateVisibleReducer';
const Home = ({ user = null, notificationMessage = null, logout = () => { } }) => {
  const { isCreateVisible, blogs } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs());
    }
  }, [user]);

  // Todo: Might wanna look into this. blog.user changes from object to id after add blog, like blog etc.

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
      {blogs.slice().sort(compareBlogLikes).map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default Home;