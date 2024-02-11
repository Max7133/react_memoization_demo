import { useState, memo } from 'react';

// Form to Add a Post
const Form = ({ onAddPost }) => {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  // Handle form submission
  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (newPostBody && newPostTitle) {
      onAddPost({
        title: newPostTitle,
        body: newPostBody,
      });
      resetNewPostInputs();
    }
  };

  // Handle reset form inputs after creating a post
  const resetNewPostInputs = () => {
    setNewPostTitle('');
    setNewPostBody('');
  };

  return (
    <form onSubmit={handlePostSubmit}>
      <input
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={newPostBody}
        onChange={(e) => setNewPostBody(e.target.value)}
        placeholder="Body"
      />
      <button type="submit">Add post</button>
    </form>
  );
};

export default memo(Form);
