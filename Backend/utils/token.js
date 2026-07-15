import jwt from "jsonwebtoken"


// Toekn Create 

const genToken=async (userId)=>{
    try {
        const token= jwt.sign({userId} , process.env.JWT_SECRET, {expiresIn:"7d"})
        return token
    } catch (error) {
        console.log(error)
    }
}   
export default genToken