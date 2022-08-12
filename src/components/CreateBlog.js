import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';

const CreateBlog = ({ setIsCreateVisible = () => { } }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createBlog({ title, author, url }));
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          Title
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-button' type="submit">create</button>
        <button id='cancel-button' type="button" onClick={() => setIsCreateVisible(false)}>cancel</button>
      </form>
    </div>
  );
};

export default CreateBlog;