import React from "react";

import useAuth from "../customHokks/Auth";
import useForm from "../customHokks/Form";
import { Link, useNavigate } from "react-router";
export default function Login() {
    const { statesHandle, form, resetForm } = useForm({
  
        email: "",
        password: "",
      
    });
const navigate=useNavigate()
  
    const { LoginApiHandler, user ,loading} = useAuth();
    if(loading){
        return(
          
            <div className="flex items-center justify-center h-64">
<div className="spinner animate-spin inline-block h-8 w-8 rounded-full border-4 border-x-black">

</div>
            </div>
         
        )
     };
    const loadder = async (e) => {
        e.preventDefault();
    
      
    
        try {

         const boolean=   await LoginApiHandler(form); 
        
         if(boolean===true){
             navigate("/blogs")
             alert("Success");
            resetForm();
 }
           
    else{
        alert("Invalid credentials")
 
    }
            } catch (error) {
            console.error("Error during signup:", error.message);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-pink-500 via-purple-500 to-blue-500 p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                     Log to Your Account
                </h1>
                <form className="grid grid-cols-1 gap-4" onSubmit={loadder}>
                 
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={statesHandle}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={statesHandle}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="mt-4 w-full bg-purple-700 text-white font-medium py-2 px-4 rounded hover:bg-purple-800 transition duration-300"
                    >
                        Login Up
                    </button>
                </form>
                <div>
                    Dont have any account <Link to="/"> Signup</Link>
                </div>
            </div>
        </div>
    );
}
