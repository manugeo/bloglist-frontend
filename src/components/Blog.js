import { useState } from 'react';
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, author, url, likes, user } = blog || {};

  return (
    <div style={blogStyle}>
      {title} {author}
      <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'hide' : 'view'}</button>
      {isExpanded && (
        <>
          <p>{url}</p>
          <p>likes {likes} <button onClick={() => { }}>like</button></p>
          <p>{user.name}</p>
        </>
      )}
    </div>
  );
};

export default Blog;