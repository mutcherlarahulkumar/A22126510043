import { useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts?type=latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feed</h2>
      <div className="max-w-lg mx-auto space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
            User {post.userid}: {post.content}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feed;
