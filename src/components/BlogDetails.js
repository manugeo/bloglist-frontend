import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};
const BlogDetails = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const { title, author, url, likes, user, isLiking } = blog || {};

  const onLike = () => dispatch(likeBlog(blog));
  const onRemove = () => {
    if (window.confirm(`Do you want to remvoe "${title}" by ${author} ?`)) dispatch(removeBlog(blog));
  };

  return (
    <div id='blog-container' style={blogStyle}>
      {title} {author}
      <p>{url}</p>
      <p id='likes-text'>likes {likes} <button onClick={onLike} disabled={isLiking}>{isLiking ? 'liking...' : 'like'}</button></p>
      <p>{user.name}</p>
      <button id='remove-button' onClick={onRemove}>remove</button>
    </div>
  );
};

export default BlogDetails;