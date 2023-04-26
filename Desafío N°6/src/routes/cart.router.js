import { Router } from "express";
import CartsController from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.get("/:cid", CartsController.getOne);

cartRouter.post("/", CartsController.post);

cartRouter.post("/:cid/product/:pid", CartsController.postOne);

export default cartRouter;
