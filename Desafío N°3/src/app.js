import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
    const limit = +req.query.limit;
    const products = await productManager.getProducts();

    if (limit > 0) {
        const newProducts = products.slice(0, limit);
        res.status(200).send({ data: newProducts, limit: limit });
    } else {
        res.status(200).send({ data: products });
    }
});

app.get("/products/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(+pid);
        res.status(200).send({ data: product });
    } catch(err) {
        res.status(404).send({status: 'error', error: err.message});
    }
});

app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});
