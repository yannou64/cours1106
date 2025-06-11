import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// connecter à MongoDB en utilisant Mongoose ODM
const URI = process.env.MONGODB_URL;

export const connectDB = async () => {
  try {
    const connexion = await mongoose.connect(URI);
    console.log("Connection à mongoDb réussi", connexion.connection.host)
    console.log(" Database: ", connexion.connection.db.databaseName)
  } catch (e) {
    console.log("Connection à mongoDb échoué : ", e.message)
    process.exit(1)
  }
};

