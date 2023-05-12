import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { nanoid } from "nanoid";

import productsRouter from "./routes/products.router.js";
import sessionRouter from "./routes/session.router.js";
import cartRouter from "./routes/cart.router.js";
import { connectDB, URI  } from "./db.config.js";

const app = express();

void (async () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(session({
        store: MongoStore.create({
            mongoUrl: URI,
            ttl: 30
        }),
        resave: false,
        saveUninitialized: false,
        secret: nanoid(10)
    }))

    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartRouter);
    app.use("/api/session/", sessionRouter);

    await connectDB();

    app.listen(8080, () => {
        console.log("Listening on port 8080");
    });
})();
