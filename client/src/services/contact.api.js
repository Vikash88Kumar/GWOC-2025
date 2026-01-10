import api from "../api/axios.js"

export const submitContactForm=async(data)=>{
    try {
       const res=await api.post("/message",data) 
       return res
    } catch (error) {
      console.log("contact form ",error)  
    }
}