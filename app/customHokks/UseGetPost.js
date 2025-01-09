import { useState } from "react";

const UseGetPost = () => {
  const [post, setPost] = useState([]);
  const [loading ,setLoading]=useState(false)

  // Function to transform buffer to Base64
  const transformBufferToBase64 = (buffer) => {
    const uint8Array = new Uint8Array(buffer);
    const binaryString = uint8Array.reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    return `data:image/png;base64,${btoa(binaryString)}`;
  };

  const getPost = async () => {
    try { 
        setLoading(true)
      
      const response = await fetch("http://localhost:8000/post/getpost", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Transform the profilePicture buffer to Base64 if present
        const transformedData = data.map((post) => ({
          ...post,
          profilePicture: post.profilePicture
            ? transformBufferToBase64(post.profilePicture.data)
            : null,
        }));

        setPost(transformedData);
        console.log(transformedData);
        setLoading(false)
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getPost, post,loading };
};

export default UseGetPost;
