import { useState } from "react";
import { URL } from "../constants";

const UseLikePost = () => {
  const [len,stelen]=useState(0)
    const likePostFunction = async (postId) => {
      try {
        const response = await fetch(`${URL}/post/like/${postId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || "Failed to like the post");
  
        console.log(data);
        return data; // Include the likesCount or success message
      } catch (error) {
        console.error("Error liking post:", error.message);
        throw error; // Pass the error to the caller for handling
      }
    };
  
    const checkAlreadyLiked = (likesArray) => {
      const user=  localStorage.getItem("user")
        console.log(user)
        if(!user) return false
        let l1=likesArray.length;
        stelen(l1)
        console.log(l1)
       return likesArray.includes(user)
    };
  
    return { likePostFunction, checkAlreadyLiked,len };
  };
  
  export default UseLikePost;
  