import { memo } from 'react';

const PostsList = ({ posts }) => {
  const postItems = posts.map((post, i) => (
    <li key={i}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>Created at: {post.createdAt.toLocaleString()}</p>
    </li>
  ));

  return (
    <div>
      <ul>{postItems}</ul>
    </div>
  );
};

export default memo(PostsList);
