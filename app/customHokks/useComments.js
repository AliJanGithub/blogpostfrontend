import { useState } from "react";
import { URL } from "../constants";

const usegetComments=()=>{

    const [commentsarray, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
   
    const getComments= async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${URL}/post/comments/${id}`,{
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });
                
            if (!response.ok) {
                throw new Error(response.statusText);   
                }
                const data = await response.json();
                console.log(data)
                
                setComments([commentsarray, ...data]);    
               console.log(Array.isArray(commentsarray))
                setLoading(false);
                
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
        };
        return {getComments,commentsarray}
}
export default usegetComments