import { useState } from "react"
import { URL } from "../constants"

 function usePostHandler() {
    const [loading,setLoading]=useState(false)
  const postCreate=async(postDescription)=>{
   try {
    setLoading(true)
    const response=await fetch(`${URL}/post/add`,{
    method: 'POST',
    body:postDescription,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    const data=await response.json()
    console.log(data)
    setLoading(false)
    if (response.ok) {
        // setUser(data);
        return true;
    } else {
        console.error("creating post  failed:",);
        return false;
    }
   } catch (error) {
    console.log(error)
   }
  }
  return{postCreate,loading}
}
export default usePostHandler
