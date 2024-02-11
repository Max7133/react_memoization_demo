import { useEffect, useMemo, useState, useCallback } from 'react';
import ShowAllPosts from './components/ShowAllPosts';
import Form from './components/Form';
import PostsList from './components/PostsList';
import { generateRandomPost } from './components/ShowAllPosts';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [addPosts, setAddPosts] = useState(() =>
    Array.from({ length: 20 }, () => ({
      ...generateRandomPost(),
      createdAt: new Date(),
    }))
  );

  // added additional useState for the 10000 expanded posts
  const [numberOfPosts, setNumberOfPosts] = useState(addPosts.length);

  //console.log(useState(addPosts.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update current time every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  /////////////////// NOT MEMOIZED 1/4 /////////////////////

  /*   const results = addPosts.filter(
    (post) =>
      searchTerm.length === 0 ||
      `${post.title} ${post.body}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  ); */

  ///////////////////// MEMOIZED 1/4 ///////////////////////
  // Memoizing "results" Array === if "addPosts" and "searchTerm" remain the same, results won't change, and the posts prop passed to PostsList.js won't change.
  // Therefore after memoization, PostsList.js won't re-render every second App.js re-renders because of "setCurrentTime".

  const results = useMemo(() => {
    return addPosts.filter(
      (post) =>
        searchTerm.length === 0 ||
        `${post.title} ${post.body}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [addPosts, searchTerm]); // will recalculate the result only if addPosts or searchTerm change.

  ////////////////////////////////////////////////////////////

  /////////////////// NOT MEMOIZED 2/4 ///////////////////////
  // Function to handle adding a custom post

  /*   const handleAddCustomPost = (customPost) => {
    setAddPosts((prevPosts) => [
      {
        ...customPost,
        createdAt: new Date(),
      },
      ...prevPosts,
    ]);

    setNumberOfPosts((prev) => prev + 1); // add + 1 for every custom post 
  }; */

  ////////////////////////////////////////////////////////////

  ///////////////////// MEMOIZED 2/4 /////////////////////////
  // Every time App.js re-renders because of setCurrentTime] = useState(new Date()), a new function reference for handleAddCustomPost is created.
  // If Form.js receives this new function reference, therefore, it triggers a re-render of Form.js even if its props haven't changed.
  // Memoized "handleAddCustomPost" + wrapping Form.js in "memo" won't get Form.js re-rendered after every second when the App.js gets re-rendered
  // Form.js will now only re-render after typing in the "title", "body" of the post and submitting the post because of State & Props change.

  // Function to handle adding a custom post
  const handleAddCustomPost = useCallback(
    (customPost) => {
      setAddPosts((prevPosts) => [
        {
          ...customPost,
          createdAt: new Date(),
        },
        ...prevPosts,
      ]);
      setNumberOfPosts((prev) => prev + 1); // add + 1 for every custom post
    },
    [] // I don't need "setAddPosts" and "setNumberOfPosts" in the dependency Array, because these state setter functions are stable between renders
  );

  ////////////////////////////////////////////////////////////

  /////////////////// NOT MEMOIZED 3/4 ///////////////////////

  /*   const expandPosts = () => ({
    render: false,
    title: 'Show all posts',
  }); */

  ////////////////////////////////////////////////////////////

  ///////////////////// MEMOIZED 3/4 /////////////////////////
  // Memoizing "expandPosts", when "render" is set to "true", prevents the application of recreating the "expandPosts" Object by avoing the recreation of the 10,000 elements every second because of App.js "setCurrentTime()"

  const expandPosts = useMemo(
    () => ({
      render: false,
      title: 'Show all posts',
    }),
    [] // ensures that this memoized Object is created only once
  );

  ////////////////////////////////////////////////////////////

  /////////////////// NOT MEMOIZED 4/4 ///////////////////////

  /*   const handleAllPostsToggle = (newPostsCount) => {
    setNumberOfPosts(newPostsCount);
  }; */

  ///////////////////////////////////////////////////////////

  ///////////////////// MEMOIZED 4/4 ////////////////////////
  // handleAllPostsToggle is recreated on every render in App.js due to functions like setCurrentTime(), and since it's being passed down as a prop to the ShowAllPosts.js component,
  // without using useCallback(), it breaks the memoization of the expandPosts object above, causing it to render all 10,000 elements every second.

  const handleAllPostsToggle = useCallback(
    (newPostsCount) => {
      setNumberOfPosts(newPostsCount);
    },
    [] // empty dependency Array, because it only uses setNumberOfPosts
  );

  ///////////////////////////////////////////////////////////

  return (
    <div>
      <h2>Current Time: {currentTime.toLocaleTimeString()}</h2>
      <header>
        <h1>Posts Search App</h1>
        <div>
          {/* for useCallback I show numberOfPosts from useState */}
          <p>There are {numberOfPosts || results.length} posts found</p>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts"
          />
        </div>
      </header>
      <div>
        <Form onAddPost={handleAddCustomPost} />
      </div>
      <div>
        <PostsList posts={results} />
      </div>
      {/* for useCallback added onAllPostsToggle from Memoized handleAllPostsToggle */}
      <ShowAllPosts
        expandPosts={expandPosts}
        onAllPostsToggle={handleAllPostsToggle}
      />
      <footer>Posts Search App</footer>
    </div>
  );
};

export default App;
