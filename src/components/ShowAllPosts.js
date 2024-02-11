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
    setAllPosts(expandPosts.render);
  }, [expandPosts.render]);

  useEffect(() => {
    // Notify the parent component about the post count when it changes
    onAllPostsToggle(allPosts ? posts.length : allPosts.length);
  }, [onAllPostsToggle, allPosts, posts]);

  return (
    <div>
      <h2>{expandPosts.title}</h2>
      <button onClick={() => setAllPosts((s) => !s)}>
        {allPosts ? 'Hide all posts' : 'Show all posts'}
      </button>

      {allPosts && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <p>Created at: {post.createdAt.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(ShowAllPosts);
