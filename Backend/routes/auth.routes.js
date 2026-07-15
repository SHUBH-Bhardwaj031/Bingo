import express from "express"
import { signIn , signOut , signUp , forgotPassword, resetPassword, googleSignIn, googleCheckUser } from "../controllers/auth.controllers.js"
const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn)
authRouter.get("/signout",signOut)
authRouter.post('/forgotpassword', forgotPassword)
authRouter.post('/resetpassword/:token', resetPassword)
authRouter.post('/google', googleSignIn)
authRouter.post('/google-check', googleCheckUser)

export default authRouter