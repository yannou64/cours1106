import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// connecter à MongoDB en utilisant Mongoose ODM
const URI = process.env.MONGODB_URL;
const reconnect_tries = 5;
const reconnect_tries_interval = 5000;

export const connectDB = async (retries = reconnect_tries) => {
  try {
    const connexion = await mongoose.connect(URI);
    console.log("Connection à mongoDb réussi", connexion.connection.host);
    console.log(" Database: ", connexion.connection.db.databaseName);
    // event listener
    mongoose.connection.on("error", (error) => {
      console.error("mongoDb connection error: ", error);
    });
    mongoose.connection.on("disconnected", () => {
      console.error("MongoDB disconnected. Attempt to reconnect");
    });
    mongoose.connection.on("reconnected", () => {
      console.error("Mongoose reconnected");
    });
  } catch (e) {
    console.log("Connection à mongoDb échoué : ", e.message);

    if (retries > 0) {
      console.log("Echec connexion on retry");
      setTimeout(() => connectDB(retries - 1), reconnect_tries_interval);
    } else {
      console.error("could not connect to mongoDb afer multiple tries");
      process.exit(1);
    }
  }
};
