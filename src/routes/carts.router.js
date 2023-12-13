import { Router } from 'express';
import { createCart, getCart,updateCart,deleteCart,deleteProductFromCart,addProductToCart,updateProductInCart} from '../controllers/carts.controller.js';

const router = Router();

router.get("/:cid", getCart);

router.post('/', createCart);

router.post('/:cid/product/:pid', addProductToCart);

router.delete("/:cid", deleteCart);

router.delete('/:cid/product/:pid', deleteProductFromCart);
        
router.put("/:cid", updateCart);

router.put('/:cid/product/:pid', updateProductInCart);

export default router;