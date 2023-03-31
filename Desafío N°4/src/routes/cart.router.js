import { Router } from "express";
import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

const cartRouter = Router();

const cartManager = new CartManager();
const productManager = new ProductManager();

cartRouter.get("/:cid", async (req, res) => {
    try {
        const cid = +req.params.cid;
        const products = await cartManager.getCartById(cid);
        res.status(200).send({data: products});
    } catch (err) {
        res.status(400).send({status: "error", error: err.message});
    }
});

cartRouter.post("/", async (req, res) => {
    try {
        await cartManager.addCart();
        res.status(200).send({status: "success", message: "Cart added successfully"});
    } catch (err) {
        res.status(400).send({status: "error", error: err.message});
    }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = +req.params.cid;
        const pid = +req.params.pid;
        await productManager.getProductById(pid);
        await cartManager.addProductCart(cid, pid);
        res.status(200).send({status: "success", message: "Your product has been added to the cart successfully"});
    } catch (err) {
        res.status(400).send({status: "error", error: err.message});
    }
});

export default cartRouter;
