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
    <form onSubmit={handlePostSubmit} className="flex flex-col mb-2">
      <h2 className="text-l font-bold mb-2">Add a New Post</h2>
      <input
        className="border rounded-md py-2 px-3 mb-2 focus:outline-none focus:border-orange-500"
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="border rounded-md py-2 px-3 mb-2 focus:outline-none focus:border-orange-500"
        value={newPostBody}
        onChange={(e) => setNewPostBody(e.target.value)}
        placeholder="Body"
      />
      <button
        className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:shadow-outline-orange self-end"
        type="submit"
      >
        Add post
      </button>
    </form>
  );
};

export default memo(Form);
