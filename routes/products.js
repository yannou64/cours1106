import express from "express";
import { getAllProducts, createProduct, updateProduct } from "../controllers/productController.js";

export const productRouter = express.Router();

productRouter.get("/api/v1", getAllProducts);
productRouter.post("/create/new", createProduct)
productRouter.put("/update/:productId", updateProduct)
