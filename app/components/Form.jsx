import React from "react";
import useForm from "../customHokks/Form";
import useAuth from "../customHokks/Auth";
import { Link, useNavigate } from "react-router";

export default function Form() {
    const { statesHandle, form, resetForm } = useForm({
        name: "",
        email: "",
        password: "",
        profilePicture: null, // Use null to store file objects
    });
    const navigate= useNavigate()

    const { signUpApiHandler, user,loading } = useAuth();
if(loading){
    return(
        <div className="flex justify-center items-center h-64">
            <div className="spinner animate-spin border-4 inline-block border-x-black rounded-full">

            </div>
        </div>
    )
}

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Construct FormData
        const formData = new FormData();
        if (!form.name || !form.email || !form.password) {
            alert("Please enter the data.");
            return;
        }
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
    
        // Append the file object directly
        if (form.profilePicture ) {
            formData.append("profilePicture", form.profilePicture); // Ensure this matches backend expectations
        } else {
           
        }
       
        console.log([...formData.entries()]); // Debugging: check the FormData
    
        try {
          const boolean=  await signUpApiHandler(formData); // Pass FormData to API handler
          if(boolean) {
            const token=localStorage.getItem("token");

            if(token){
                alert("Success");
                navigate("/blogs")

            }
           
            // resetForm();
           
        }
        else{
            alert("error in signing up user ");
            // resetForm();
        }
           
           
        } catch (error) {
            console.error("Error during signup:", error.message);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-pink-500 via-purple-500 to-blue-500 p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                    Create Your Account
                </h1>
                <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={statesHandle}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your name"
                        />
                    </div>
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
                    <div className="flex flex-col">
                        <label htmlFor="profilePicture" className="text-gray-700 font-medium">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            onChange={statesHandle}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-purple-700 text-white font-medium py-2 px-4 rounded hover:bg-purple-800 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <div>
                    Already have an account <Link to="/login" class="btn btn-primary">Login</Link>
                </div>
            </div>
        </div>
    );
}
