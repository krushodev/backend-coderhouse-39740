import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const viewsRouter = Router();

const productManager = new ProductManager();

viewsRouter.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {
        title: "Home",
        products,
    });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {
        title: "Productos en tiempo real",
        products,
    });
});

export default viewsRouter;
