const Security=()=>{

    const privateRoute=()=>{
        const token=localStorage.getItem('token');
        if(!token) return false;
        return true;
    }
    return privateRoute
}
export default Security;