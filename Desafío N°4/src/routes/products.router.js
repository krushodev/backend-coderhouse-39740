import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import generateCode from "../helper/helper.js";
import uploader from "../utils/multer.js";

const productsRouter = Router();

const productManager = new ProductManager();

productsRouter.get("/", async (req, res) => {
    const limit = +req.query.limit;
    const products = await productManager.getProducts();

    if (limit > 0) {
        const newProducts = products.slice(0, limit);
        res.status(200).send({ data: newProducts, limit: limit });
    } else {
        res.status(200).send({ data: products });
    }
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(+pid);
        res.status(200).send({ data: product });
    } catch(err) {
        res.status(404).send({status: 'error', error: err.message});
    }
});

productsRouter.post("/", uploader.single("file"), async (req, res) => {
    try {
        const file = req.file;
        const product = req.body;
        if(!(file)) {
            product.thumbnails = "image.png";
        } else {
            product.thumbnails = file.path;
        }
        product.code = generateCode();
        product.status = true;
        await productManager.addProduct(product);
        res.status(200).send({status: 'success', message: 'Product added successfully'})
    } catch(err) {
        res.status(400).send({ status: 'error', error: err.message});
    }
});

productsRouter.put("/:pid", async (req, res) => {
    try {
        const pid = +req.params.pid;
        const update = req.body;
        await productManager.updateProduct(pid, update);
        res.status(200).send({status: "success", message: "Product updated successfully"});
    } catch (err) {
        res.status(400).send({ status: "error", error: err.message});
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    try {
        const pid = +req.params.pid;
        await productManager.deleteProduct(pid);
        res.status(200).send({status: "success", message: "Product deleted successfully"});
    } catch (err) {
        res.status(400).send({ status: "error", error: err.message});
    }
});

export default productsRouter;
