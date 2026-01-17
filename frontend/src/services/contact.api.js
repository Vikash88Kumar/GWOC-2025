import api from "../api/axios.js"

export const submitContactForm=async(data)=>{
    try {
       const res=await api.post("/message",data) 
       return res
    } catch (error) {
      console.log("contact form ",error)  
    }
}
export const getAllMessages=async()=>{
    try {
       const res=await api.get("/message") 
       return res
    } catch (error) {
      console.log("get all message failed ",error)  
    }
}
export const respondToMessage=async(id,message)=>{
    try {
       const res=await api.patch(`/message/${id}/respond`,{responseMessage: message.trim()}) 
       return res
    } catch (error) {
      console.log("contact form ",error)  
    }
}