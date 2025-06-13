import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/dbconnection.js";
import { productRouter } from "./routes/products.js";
import { authRouter } from "./routes/auth.js";


dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser())

app.use("/", productRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
});
