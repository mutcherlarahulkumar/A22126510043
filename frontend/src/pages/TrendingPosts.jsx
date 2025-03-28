import { useState, useEffect } from "react";

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts?type=popular")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trending Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md max-w-lg mx-auto mb-4">
            <p className="text-gray-800 font-semibold">User ID: {post.userid}</p>
            <p className="text-gray-600">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">Comments: {post.comments}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">No trending posts available.</p>
      )}
    </section>
  );
};

export default TrendingPosts;

