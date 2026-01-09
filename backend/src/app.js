import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));




app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("backend is running")
})

//routes import 
// import userRouter from "./routes/user.routes.js"
import enquiryRouter from "./routes/enquiryForm.routes.js"
import homepageRouter from "./routes/homepage.routes.js"
//routes declare

// app.use("/api/v1/users", userRouter)
app.use("/api/v1/enquiry",enquiryRouter)
app.use("/api/v1/homepage",homepageRouter)


export {app}