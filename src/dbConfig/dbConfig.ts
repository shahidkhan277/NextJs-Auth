import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log("Connected to MongoDB successfully");
    });

    connection.on('error', (err) => {
        console.log("Error connecting to MongoDB", err);
        process.exit();
    })

  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}
