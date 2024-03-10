import { memo } from 'react';

const PostsList = ({ posts }) => {
  const postItems = posts.map((post, i) => (
    <li
      key={i}
      className="border rounded-md p-4 mb-4 bg-white border-orange-300"
    >
      <h3 className="text-lg font-bold">{post.title}</h3>
      <p className="text-gray-800">{post.body}</p>
      <p className="text-orange-500">
        Created at: {post.createdAt.toLocaleString()}
      </p>
    </li>
  ));

  return (
    <div>
      <ul>{postItems}</ul>
    </div>
  );
};

export default memo(PostsList);
