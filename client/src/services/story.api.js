import api from "../api/axios.js"

export const getStoryPage=async()=>{
    try {
     const res=await api.get("/story")
     return res.data   
    } catch (error) {
       console.log("story page failed",error) 
    }
}