import React from "react";
import useForm from "../customHokks/Form";
import {  useNavigate } from "react-router";
import usePostHandler from "../customHokks/usePostHandler";

export default function Posts() {
    const { statesHandle, form, resetForm } = useForm({
        title: "",
        content: "",
       
        profilePicture: null, // Use null to store file objects
    });
    const navigate= useNavigate()
const {postCreate,loading}=usePostHandler()
    
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
        if (!form.title || !form.content ) {
            alert("Please enter the data.");
            return;
        }
        formData.append("title", form.title);
        formData.append("content", form.content);
    
        // Append the file object directly
        if (form.profilePicture ) {
            formData.append("profilePicture", form.profilePicture); // Ensure this matches backend expectations
        } else {
           
        }
       
        console.log([...formData.entries()]); // Debugging: check the FormData
    
        try {
          const boolean=  await postCreate(formData); // Pass FormData to API handler
          if(boolean) {

          
                alert("Success");
                navigate("/blogs")

          
           
            // resetForm();
           
        }
        else{
            alert("error in creating post ");
            // resetForm();
        }
           
           
        } catch (error) {
            console.error("Error during creation of post:", error.message);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-l from-pink-500 via-purple-500 to-blue-500 p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                    Create Your post
                </h1>
                <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700 font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={statesHandle}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter post title"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 font-medium">
                            Content
                        </label>
                        <input
                            type="content"
                            id="content"
                            name="content"
                            value={form.content}
                            onChange={statesHandle}
                            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your Constent"
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="profilePicture" className="text-gray-700 font-medium">
                             Picture
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
                       Create Post
                    </button>
                </form>
               
            </div>
        </div>
    );
}
