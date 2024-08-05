
import mongoose from "mongoose";

const dbConnect = async () => {
  try {

    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'blog-app'
    })
    if (connection.readyState === 1) {
      console.log('Already connected to db');
    }
    connection.on('connected', () => {
      console.log('db connected');
    })

    connection.on('error', () => {
      console.log('error in connecting to db');
    })
  } catch (error) {
    console.log('Failed to connect to db');
    process.exit(1)
  }
}

export default dbConnect;