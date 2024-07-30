import mongoose from "mongoose";

export async function connect(connectString:string) {
    try {
        mongoose.connect(connectString)
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log("Mongodb Connected")
        })
        
        connection.on('error',(err) => {
            console.log("Error occured",err)
        })
        
    } catch (error) {
        console.log(error,"Database Error")
        
        
    }

}