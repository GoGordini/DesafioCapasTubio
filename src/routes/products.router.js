import { Router } from 'express';
import { getProduct, getProductById, deleteProduct, createProduct, updateProduct } from '../controllers/products.controller.js';
const router = Router();

router.get('/', getProduct);

router.get("/:pid", getProductById);

router.delete("/:pid", deleteProduct);

router.post("/", createProduct);

router.put("/:pid", updateProduct);

export default router;