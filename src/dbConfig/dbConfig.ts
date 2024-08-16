import { error } from "console";
import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)  //! says don't worry. It will be available
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB connected Successfully");
            
        })

        connection.on('error',()=>{
            console.log("Mongo connection error. make suere DB is running "+error);
            process.exit();
            
        })


    }
    catch (error) {
        console.log("Something went wrong");
        console.log(error);


    }
}