import api from "../api/axios.js"

export const service=async()=>{
    try {
       const res=await api.get("/service")
       return res.data
    } catch (error) {
        console.log("service fetched failed",error.message)
    }
}