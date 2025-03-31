import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export async function connect(): Promise<void>{

    if(connection.isConnected){
        console.log("already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI!);

        connection.isConnected = db.connections[0].readyState

        console.log("db connected successfully");
        
    } catch (error) {
        console.log("error in connecting database");
        process.exit(1)
    }
}