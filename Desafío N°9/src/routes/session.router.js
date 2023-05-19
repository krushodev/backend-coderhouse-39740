import { Router } from "express";

import SessionController from "../controllers/session.controller.js";
import auth from "../middlewares/auth.js";

const sessionRouter = Router();

sessionRouter.get("/logout", SessionController.logout);

sessionRouter.post("/login",  SessionController.login);

sessionRouter.post("/signup", SessionController.signup);

// Testing auth middleware

sessionRouter.get("/public", (req, res) => {
    res.status(200).send({message: "Esto es público"});
});

sessionRouter.get("/private", auth, (req, res) => {
    res.status(200).send({message: "Esto es privado"});
});

export default sessionRouter;
