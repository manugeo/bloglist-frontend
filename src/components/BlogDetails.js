import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};
const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const blog = useSelector(state => state.blogs.find(b => (b.id === id)) || null);

  useEffect(() => {
    if (blog === null) navigate('/');
  }, [blog]);

  if (blog === null) return null;

  const { title, author, url, likes, user, isLiking } = blog || {};
  const onLike = () => dispatch(likeBlog(blog));
  const onRemove = () => {
    if (window.confirm(`Do you want to remvoe "${title}" by ${author} ?`)) dispatch(removeBlog(blog));
  };

  return (
    <div>
      <h2>Blogs</h2>
      <div id='blog-container' style={blogStyle}>
        {title} {author}
        <p>{url}</p>
        <p id='likes-text'>likes {likes} <button onClick={onLike} disabled={isLiking}>{isLiking ? 'liking...' : 'like'}</button></p>
        <p>{user.name}</p>
        <button id='remove-button' onClick={onRemove}>remove</button>
      </div>
    </div>
  );
};

export default BlogDetails;