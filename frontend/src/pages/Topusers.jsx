import React from "react";

const TopUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/users")
          .then((response) => response.json())
          .then((data) => {
            const formattedUsers = data.topUsers.map((user) => ({
              name: user.username,
              posts: user.postCount,
              initial: user.username.charAt(0).toUpperCase(),
            }));
            setUsers(formattedUsers);
          })
          .catch((error) => console.error("Error fetching users:", error));
      }, []);

  return (
    <section className="mb-8 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Users</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md w-40 text-center hover:scale-105 transition"
          >
            <div className="bg-purple-500 text-white text-xl w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-2">
              {user.initial}
            </div>
            <p className="font-semibold text-gray-700">{user.name}</p>
            <p className="text-sm text-gray-500">Posts: {user.posts}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopUsers;
