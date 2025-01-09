import { useState } from "react";
import { URL } from "../constants";

const useAuth = () => {
    let users;
    const [user, setUser] = useState("");
    const [pic,setPic]=useState("")
    const[loading,setLoading]=useState(false)
   const [userId,setuserId]=useState("")
    const signUpApiHandler = async (credentials) => {
        try {
          
            setLoading(true)
            const response = await fetch(`${URL}/auth/signup`, {
                method: "POST",
                // No `Content-Type` header for FormData; the browser sets it automatically
                body: credentials, // Directly pass the FormData object
            });

            const data = await response.json();
            console.log(data);
            const token = data.token;
            const name=data.name;
            localStorage.setItem("name", name);
            localStorage.setItem("token", token);
            setLoading(false);
            if (response.ok) {
                setUser(data);
                return true;
            } else {
                console.error("Signup failed:", data);
                return false;
            }
            
        } catch (error) {
            console.error("Error during signup:", error.message);
        }
    };



    const  LoginApiHandler=async(credentials)=>{
        try {
            // if(!credentials.name || !credentials.email || !credentials.password || !credentials.profilePicture)
            //     {
            //         return alert("Please enter: CREDENTIALS PROPERLY")  
            //     }
            setLoading(true)
            const response=await fetch(`${URL}/auth/signin`,{
                body: JSON.stringify(credentials),
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
               
            })
            const data=await response.json();
            const token = data.token;
            const name=data.name;
            localStorage.setItem("token", token);
            console.log(token)
            setLoading(false)
            if (response.ok) {
                return true
            }
           
       else{
        return false
       }
        } catch (error) {
            console.log(error)
        }
    };
    const getUser=async()=>{
        try {
            const response= await fetch(`${URL}/auth/getuser`,{
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                method:"GET",
            })
            const data=await response.json();
            console.log("mmmmmmmmmmm",JSON.stringify(data));
            setPic(data.profilePicture)
            console.log("user data",data)
           localStorage.setItem("user",JSON.stringify(data))
            setuserId(data._id);
            
        } catch (error) {
            
        }
    }
    return { signUpApiHandler, user,LoginApiHandler ,getUser,pic,loading,userId,users,};
};


export default useAuth;
