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
import founderRouter from "./routes/founder.routes.js"
import serviceRouter from "./routes/service.routes.js"
import storyRouter from "./routes/story.routes.js"
import contactRouter from "./routes/contactpage.routes.js"
import contactmessageRouter from "./routes/contact.routes.js"
import testimonialRouter from "./routes/testimonial.routes.js"
//routes declare

// app.use("/api/v1/users", userRouter)
app.use("/api/v1/enquiry",enquiryRouter)
app.use("/api/v1/homepage",homepageRouter)
app.use("/api/v1/founderpage",founderRouter)
app.use("/api/v1/service",serviceRouter)
app.use("/api/v1/story",storyRouter)
app.use("/api/v1/contact",contactRouter)
app.use("/api/v1/message",contactmessageRouter)
app.use("/api/v1/testimonial",testimonialRouter)

export {app}