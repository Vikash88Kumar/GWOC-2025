import api from "../api/axios.js"

export const getFounderPage=async()=>{
    try {
        const res=await api.get("/founderpage")
        return res.data
    } catch (error) {
        console.log("fetched founder page ",error)    
    }
}