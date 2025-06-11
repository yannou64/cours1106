import ProductModel from "../models/Product.js";

export async function getAllProducts(req, res){
    try{
        const products = await ProductModel.find()
        //count tous les produits
        const totalProductsCount = await ProductModel.countDocuments()
        // Return le produit avec le total e produits 
        res.status(200).json({products, totalProductsCount})
    } catch (e) {
        console.error("Erreur de fetch allProducts : ", e)
        res.status(500).json({
            message: "Error of getting all products",
            error: e.message
        })
    }
}

export async function createProduct(req, res){
    const newProduct = new ProductModel(req.body)
    try {
        const saveProduct = await newProduct.save()
        res.status(201).json({saveProduct})
    } catch (e){
        console.error("Enregistrement du produit echec : ", e)
        res.status(500).json({message: "Error save product ", error: e.message})
    }
}

export async function updateProduct(req, res){
    const {productId} = req.params
    try{
        const product = await ProductModel.findByIdAndUpdate(productId, { $set: req.body}, { new: true, runValidators: true})
        console.log(product)
        if(!product) return res.status(404).json({message: "product not found"})
        res.status(200).json({message: "product found and update"})
    } catch (e){
        console.log("Erreur d'update :", e)
        res.status(500).json({message: `erreur de update : ${e.message}`})
    }

}