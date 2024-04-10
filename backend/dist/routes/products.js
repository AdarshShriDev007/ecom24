import express from "express";
import { deleteProductById, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getProductById, newProduct, updateProductById, } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
router.post("/new", singleUpload, newProduct);
router.get("/all", getAllProducts);
router.get("/latest", getLatestProducts);
router.get("/categories", getAllCategories);
router.get("/admin-products", getAdminProducts);
router
    .route("/:id")
    .get(getProductById)
    .put(singleUpload, updateProductById)
    .delete(deleteProductById);
export default router;
