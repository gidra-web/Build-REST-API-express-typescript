import mongoose from "mongoose";
import 'dotenv/config'
import log from "./logger";

export default async function connect(){
    try { 
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("DB connected")}   
     catch (error) {
        log.error("DB connection failed");
        process.exit(1);
    }

}
