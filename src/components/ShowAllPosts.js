import { useState, useEffect, memo } from 'react';
import { faker } from '@faker-js/faker';

export const generateRandomPost = () => ({
  title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
  body: faker.hacker.phrase(),
  createdAt: new Date(),
});

// HEAVY COMPONENT (added onAllPostsToggle)
const ShowAllPosts = ({ expandPosts, onAllPostsToggle }) => {
  // [posts] are only called once on the initial render
  const [posts] = useState(() =>
    Array.from({ length: 10000 }, () => generateRandomPost())
  );

  const [allPosts, setAllPosts] = useState(expandPosts.render);

  useEffect(() => {
    // Notify the parent component about the post count when it changes
    onAllPostsToggle(allPosts ? posts.length : allPosts.length);
  }, [onAllPostsToggle, allPosts, posts]);

  return (
    <div>
      <h2>{expandPosts.title}</h2>
      <button
        className="bg-orange-600 text-white py-2 px-4 mt-4 mb-6 rounded-md hover:bg-orange-700 focus:outline-none focus:shadow-outline-orange self-end"
        onClick={() => setAllPosts((s) => !s)}
      >
        {allPosts ? 'Hide all posts' : 'Show all posts'}
      </button>
      {allPosts && (
        <ul>
          {posts.map((post, i) => (
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(ShowAllPosts);
