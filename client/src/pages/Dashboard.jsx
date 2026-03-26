import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const fetchPosts = async (pageNumber) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/posts?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(res.data.posts);
      setPage(res.data.currentPage);
      setHasNext(res.data.hasNextPage);
      setHasPrev(res.data.hasPrevPage);

    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}

      <div>
        <button disabled={!hasPrev} onClick={() => fetchPosts(page - 1)}>
          Previous
        </button>

        <span> Page {page} </span>

        <button disabled={!hasNext} onClick={() => fetchPosts(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;