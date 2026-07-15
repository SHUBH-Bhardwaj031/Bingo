import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
dotenv.config()
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import dns from "dns"
dns.setServers(['8.8.8.8', '8.8.4.4'])

const app=express()

// frontend + Backend connection
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

// convert frontend daata in json
app.use(express.json())

//cookie browser me parse karne ke liye
app.use(cookieParser())

// add api/auth sab router ke saamne
app.use("/api/auth",authRouter)




const port=process.env.PORT || 5000

app.listen(port, ()=>{
    connectDb()
    console.log(`Server is Running on ${port}`)
})






