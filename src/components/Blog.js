import { useState } from 'react';
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, onLike, onRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, author, url, likes, user, isLiking } = blog || {};

  const onRemoveClick = () => {
    if (window.confirm(`Do you want to remvoe "${title}" by ${author} ?`)) onRemove();
  };

  return (
    <div style={blogStyle}>
      {title} {author}
      <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'hide' : 'view'}</button>
      {isExpanded && (
        <>
          <p>{url}</p>
          <p>likes {likes} <button onClick={onLike} disabled={isLiking}>{isLiking ? 'liking...' : 'like'}</button></p>
          <p>{user.name}</p>
          <button onClick={onRemoveClick}>remove</button>
        </>
      )}
    </div>
  );
};

export default Blog;