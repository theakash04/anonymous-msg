import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '')
    
    console.log("DB log"+db);
    console.log("DB.connections log"+db.connections);
    
    connection.isConnected = db.connections[0].readyState
    console.log("DB connected successfully");
    
  } catch (error) {
    console.log("DB connection failed", error)
    process.exit(1)
  }
}


export default dbConnect