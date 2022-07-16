import { useState } from 'react';
import blogsService from '../services/blogs';

const CreateBlog = ({ showNotification = () => { }, onCreateSuccess = () => { }, setIsCreateVisible = () => { } }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const { createBlog } = blogsService;

  const handleCreate = async (e) => {
    e.preventDefault();
    const { blog, error } = await createBlog({ title, author, url });
    if (blog === null) {
      showNotification(error);
    } else {
      onCreateSuccess(blog);
      clearForm();
      showNotification("Blog created successfully!");
    };
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
        <button type="button" onClick={() => setIsCreateVisible(false)}>cancel</button>
      </form>
    </div>
  );
};

export default CreateBlog;