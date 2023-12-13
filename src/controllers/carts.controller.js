import CartManager from "../dao/dbManager/carts.manager.js";
import ProductManager from "../dao/dbManager/products.manager.js"
import { cartPath, productPath} from '../utils.js';
import {createCart as createCartService,getCart as getCartService,updateCart as updateCartService, deleteCart as deleteCartService, deleteProductFromCart as deleteProductFromCartService} from "../services/carts.service.js";
import {getProductById as getProductByIdService} from "../services/products.service.js";

const cartManager = new CartManager(cartPath);
const productManager = new ProductManager(productPath);

export const createCart = async (req, res) => {
    try {
    const result = await createCartService();
    res.status(201).send({ status: 'success', message: "cart created", payload: result });
    }
    catch (error){
        res.status(500).send({error:error.message});}
        
}

export const getCart=async(req,res)=>{
    try{
        const {cid} =req.params;
        const cart = await getCartService(cid)
        if (!cart){
            return res.status(404).send({status:"error",message:"Cart not found"})
        }
        res.send({status:"success",payload:cart});
    }
    catch(error){
        res.status(500).send({error:error.message});}
}

export const addProductToCart = async (req,res)=>{
    try{
        const cid =req.params.cid;
        const pid =req.params.pid;
        const cart = await getCartService(cid);
        const product = await getProductByIdService(pid);
        if (!cart){
                return res.status(404).send({status:"error",message:"Cart not found"})
            }
            if (!product){
                return res.status(404).send({status:"error",message:"Product not found"})
            }
        if (cart.products.length===0){
            cart.products.push({"product":pid,"quantity":1})
        } else{
        const indexProductInCart = cart.products.findIndex(product=>product.product._id.toString()===pid)
            if (indexProductInCart!==-1){
                cart.products[indexProductInCart].quantity++;
                    } else {
                        cart.products.push({"product":pid,"quantity":1});
                    };
                }            
        const result = await updateCartService(cid,cart.products);
        res.status(201).send({status:"success",payload:result});
            }
    catch(error){
        console.log(error.message);
        res.status(500).send({error:error.message});}
    }

export const deleteCart=async (req,res)=>{
    try {
    const {cid} =req.params;
    const cart = await getCartService(cid);
    if (!cart){
            return res.status(404).send({status:"error",message:"Cart not found"})
        }
    const result = await deleteCartService(cid);
    res.status(200).send({status:"success",payload:result});
    }
    catch(error) {
    res.status(500).send({status:"error",message:error.message})}
    }

   export const deleteProductFromCart= async (req,res)=>{
        try{
            const cid =req.params.cid;
            const pid =req.params.pid;
            const cart = await getCartService(cid);
            const product = await getProductByIdService(pid);
            if (!cart){
                    return res.status(404).send({status:"error",message:"Cart not found"})
                }
            if (!product){
                    return res.status(404).send({status:"error",message:"Product not found"})
                }
            if (cart.products.length!==0){
            const indexProductInCart = cart.products.findIndex(product=>product.product._id.toString()===pid)
                if (indexProductInCart!==-1){
                    cart.products.splice(indexProductInCart,1);
                        } 
            }            
            const result = await deleteProductFromCartService(cid,cart.products);
            res.status(200).send({status:"success",payload:result});
            }
        catch(error){
            console.log(error.message);
            res.status(500).send({error:error.message});}
        }

export const updateCart= async (req,res)=>{
            try {
            const {products} = req.body;
            const {cid} =req.params;
            if (!products) {
                return res.status(400).send({status:"error", message:"incomplete values"})};
            const cart = await getCartService(cid);
            if (!cart){
                return res.status(404).send({status:"error",message:"Cart not found"})
            }
            const result = await updateCartService(cid,products);
            res.status(201).send({status:"success",payload:result});
            }
            catch(error) {
            res.status(500).send({status:"error",message:error.message})}
            }

export const updateProductInCart = async (req,res)=>{
    try{
        const cid =req.params.cid;
        const pid =req.params.pid;
        const amount = req.body;
        const cart = await getCartService(cid);
        const product = await getProductByIdService(pid);
        if (!cart){
                return res.status(404).send({status:"error",message:"Cart not found"})
            }
        if (!product){
                return res.status(404).send({status:"error",message:"Product not found"})
            }
        if (cart.products.length===0){
            cart.products.push({"product":pid,"quantity":amount.quantity})
        } else{
        const indexProductInCart = cart.products.findIndex(product=>product.product._id.toString()===pid)
            if (indexProductInCart!==-1){
                cart.products[indexProductInCart].quantity+=amount.quantity;
                    } else {
                        cart.products.push({"product":pid,"quantity":amount.quantity});
                    };
                }            
                const result = await updateCartService(cid,cart.products);
        res.status(201).send({status:"success",payload:result});
            }
    catch(error){
        console.log(error.message);
        res.status(500).send({error:error.message});}
    }