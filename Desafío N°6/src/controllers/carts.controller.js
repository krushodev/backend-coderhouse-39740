import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

class CartsController {
    static getOne = async (req, res) => {
        try {
            const manager = new CartManager();
            const { cid } = req.params;
            const result = await manager.getOne(cid);
            res.status(200).send({status: "success", data: result});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

    static post = async (req, res) => {
        try {
            const manager = new CartManager();
            const result = await manager.addOne();
            res.status(200).send({status: "success", message: "Cart added successfully", data: result});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

    static postOne = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.addProduct(cid, pid);
            res.status(200).send({status: "success", message: "Your product has been added to the cart successfully", data: result});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

}

export default CartsController;
