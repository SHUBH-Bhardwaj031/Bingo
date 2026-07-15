import mongoose from "mongoose";

const connectDb = async () => {
   try {
        await mongoose.connect(process.env.MONGO_URL)
    console.log("DataBase Is Connected")
   }
   catch (error) {
    console.log("DataBase Error:", error.message)
   }
}

export default connectDb