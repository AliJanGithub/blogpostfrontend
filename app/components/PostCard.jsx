import { useEffect, useState } from "react";
import usegetComments from "../customHokks/useComments";
import UseLikePost from "../customHokks/UseLikePost";
import useAuth from "../customHokks/Auth.js";

function PostCard({ p, loading }) {
  const [showComments, setShowComments] = useState(false);
  const [likeLight, setLikeLight] = useState(false);
  const [isLoadingLike, setIsLoadingLike] = useState(false);
 
  const { getComments, commentsarray } = usegetComments();
  const { likePostFunction, checkAlreadyLiked ,len} = UseLikePost();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchCommentsAndLikes = async () => {
      await getComments(p._id);
      const isLiked=checkAlreadyLiked(p.likes);
      console.log("hi ")
      console.log("hi ",isLiked)
      setLikeLight(isLiked);
    };
    fetchCommentsAndLikes();
  }, [p._id, userId]);

  const handleLike = async () => {
    try {
      setIsLoadingLike(true);
      const data = await likePostFunction(p._id);
      console.log("hello",data)
      setLikeLight(true); // Update the state only if the like is successful
      console.log(data.msg);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoadingLike(false);
    }
  };

  const toggleComments = () => setShowComments(!showComments);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-md md:max-w-2xl mx-auto">
      {/* Post Header */}
      <div className="flex items-center mb-4">
        {p.profilePicture && (
          <img
            src={p.profilePicture}
            alt="User"
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold">{p.title}</h2>
          <p className="text-gray-500 text-sm">
            {new Date(Date.parse(p.createdAt)).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <h3 className="text-xl font-bold mb-2">{p.title}</h3>
      <p className="text-gray-700 mb-4">{p.content}</p>
      {p.profilePicture && (
        <div className="mb-4">
          <img
            src={p.profilePicture}
            alt="Blog"
            className="rounded-lg w-full h-[300px] md:h-[400px] object-fill"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center p-2 rounded-sm bg-gray-400">
        <button
          className={`flex items-center space-x-4 ${likeLight ? "text-blue-500" : "text-black"} `}
          onClick={handleLike}
          disabled={isLoadingLike}
        ><span>{len}</span>
          <i className={`fa fa-thumbs-up ${isLoadingLike ? "animate-spin" : ""}`}></i>
          <span>{isLoadingLike ? "Loading..." : " "}</span>
        </button>
        <button onClick={toggleComments} className="flex items-center space-x-2 text-blue-500 ">
          <i className="fa fa-comment"> </i>
          <span>Comment</span>
        </button>
      </div>

      {/* Comments */}
      <div>
        {showComments ? (
          commentsarray.length > 0 ? (
            commentsarray.map((c, index) => (
              <div key={index} className="bg-gray-100 rounded p-2 mb-2">
                <p className="text-gray-800">{c.content}</p>
                <p className="text-sm text-gray-500">{c.author}</p>
              </div>
            ))
          ) : (
            <p className="text-black">No comments yet.</p>
          )
        ) : null}
      </div>
    </div>
  );
}

export default PostCard;
