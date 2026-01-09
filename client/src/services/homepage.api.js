import api from "../api/axios.js"

export const gethomePage=async()=>{
    try {
        const res=await api.get("/homepage")
        return res.data
    }catch (error){
        console.log("homepage failed",error?.message)
    }
}