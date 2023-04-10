import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import { resolve } from "path";
import { Server } from "socket.io";
import handlebars from "express-handlebars";

const app = express();

const httpServer = app.listen(8080, () => {
    console.log("Listening on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {

    console.log('Usuario conectado')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", resolve("src/views"));
app.set("view engine", "handlebars");

app.set("io", socketServer);

app.use("/static", express.static(resolve("src/public")))

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
