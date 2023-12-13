import CartManager from "../dao/dbManager/carts.manager.js";
import ProductManager from "../dao/dbManager/products.manager.js"
import { cartPath, productPath} from '../utils.js';

const cartManager = new CartManager(cartPath);
const productManager = new ProductManager(productPath);

export const createCart= async () => {
    const result = await cartManager.save();
    return result;
}

export const getCart= async (cid) => {
    const cart = await cartManager.getCartById(cid)
    return cart;
}

export const updateCart= async (cid,products) => {
    const result = await cartManager.update(cid,{"products": products});
    return result;
}

export const deleteCart= async (cid) => {
    const result = await cartManager.delete(cid);
    return result;
}

export const deleteProductFromCart= async (cid,products) => {
    const result = await cartManager.update(cid,{"products": products});
    return result;
}

