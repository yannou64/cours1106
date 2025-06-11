import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbconnection.js";
import { productRouter} from "./routes/products.js";


dotenv.config()
const app = express();

connectDB()

app.use(express.json())

app.use("/", productRouter)

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
});
