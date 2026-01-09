import api from "../api/axios.js"

export const homePage=async()=>{
    try {
        const res=await api.patch("/homepage")
        return res.data
    } catch (error) {
        console.log("homepage failed",error?.message)
    }
}