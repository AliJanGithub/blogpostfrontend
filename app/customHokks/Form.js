import { useState } from "react"

const useForm=(initialize)=>{
    const [form,setForm]=useState(initialize);
    const statesHandle = (e) => {
        const { name, value, files } = e.target;
        setForm((prevVal) => ({
            ...prevVal,
            [name]: files ? files[0] : value, // Use files[0] for file inputs
        }));
    };
    

    const resetForm=()=>setForm(initialize);

    return {form,statesHandle,resetForm}
 
}
export default useForm;