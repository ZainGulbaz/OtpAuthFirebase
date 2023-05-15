import Axios from "axios";


export const getRegisteredUsers= async()=>{
    try{
        
let res= await Axios.get(`${import.meta.env.VITE_API_URL}usersList`);
return res;

    }
    catch(err)
    {
        console.log(err);
        throw new Error(err);
        
    }
}

export const bulkSMSApiCall=async(noOfUsers,offSet,message)=>{
    let res;
    try{
         res=await Axios.post(`${import.meta.env.VITE_API_URL}sendbulk`,{
            noOfUsers,
            offSet,
            message
        })
        return res;
    }
    catch(err)
    {
    
        return(err.response);
        
    }
}