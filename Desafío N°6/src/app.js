import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import { resolve } from "path";
import handlebars from "express-handlebars";
import { connectDB } from "./db.config.js";

const app = express();

void (async () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine("handlebars", handlebars.engine());
    app.set("views", resolve("src/views"));
    app.set("view engine", "handlebars");

    app.use("/static", express.static(resolve("src/public")))

    app.use("/", viewsRouter);


    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartRouter);

    await connectDB();

    app.listen(8080, () => {
        console.log("Listening on port 8080");
    });
})();
