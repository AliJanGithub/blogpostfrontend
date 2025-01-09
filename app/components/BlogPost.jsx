import { useEffect, useState } from "react";
import UseGetPost from "../customHokks/UseGetPost";
import PostCard from "./PostCard";
import Navbar from "./Navbar";
import useAuth from "../customHokks/Auth";
import { useNavigate } from "react-router";

function BlogPage() {
  const [name, setname] = useState("");
  const [pic, setprofile] = useState("");
  const { getPost, post, loading } = UseGetPost();
  const { getUser } = useAuth();
  const navigate = useNavigate();

  const getsusers = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not found in localStorage");
      setname(user.name);
      setprofile(user.profilePicture);
    } catch (error) {
      console.error("Error in getsusers:", error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        await getUser();
        getsusers();
        await getPost();
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Navbar />
      <div className="flex justify-center items-center">
        Welcome {name}
      </div>
      <div className="container mx-auto py-8">
        {post.length > 0 ? (
          post.map((p, index) => (
            <PostCard key={index} p={p} loading={loading} />
          ))
        ) : (
          <div className="flex justify-center items-center h-64">
            {loading ? (
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-x-gray-800 rounded-full text-red-500"></div>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;
