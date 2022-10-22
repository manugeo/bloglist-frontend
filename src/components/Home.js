import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBlog from './CreateBlog';
import { initializeBlogs } from '../reducers/blogsReducer';
import { isCreateVisibleChange } from '../reducers/isCreateVisibleReducer';
import { useNavigate } from 'react-router-dom';


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
  cursor: 'pointer'
};

const Home = ({ logout = () => { } }) => {
  const { isCreateVisible, blogs, currentUser, notificationMessage } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(initializeBlogs());
    }
  }, [currentUser]);

  const onBlogClick = (blog) => navigate(`/blogs/${blog.id}`, { state: { blog } });

  // Todo: Might wanna look into this. blog.currentUser changes from object to id after add blog, like blog etc.

  // Note: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters
  const compareBlogLikes = (a, b) => {
    if (a.likes === b.likes) return 0;
    return (a.likes > b.likes) ? -1 : 1;
  };

  return (
    <div>
      <h2>Blogs</h2>
      {currentUser && (
        <>
          <h5>{currentUser.name} logged-in</h5>
          <button type='button' onClick={logout}>log-out</button>
        </>
      )}
      {notificationMessage && <p>{notificationMessage}</p>}
      {!isCreateVisible
        ? <div><button type='button' onClick={() => dispatch(isCreateVisibleChange(true))}>Create new</button></div>
        : <CreateBlog setIsCreateVisible={(isVisible) => dispatch(isCreateVisibleChange(isVisible))} />}
      {blogs.slice().sort(compareBlogLikes).map((blog, i) => <p key={blog.id} style={blogStyle} onClick={() => onBlogClick(blog)}>
        {`${(i + 1)}. ${blog.title}`}
      </p>)}
    </div>
  );
};

export default Home;