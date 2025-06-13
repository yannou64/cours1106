import express from "express";
import { getAllProducts, createProduct, updateProduct } from "../controllers/productController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const productRouter = express.Router();

productRouter.get("/api/v1", getAllProducts);
productRouter.post("/create/new", verifyToken, createProduct);
productRouter.put("/update/:productId", verifyToken, updateProduct);
