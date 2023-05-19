import { generateToken } from "../helper/helper.js";
import SessionManager from "../managers/SessionManager.js";
import loginSchema from "../validations/users/login.validation..js";
import registerSchema from "../validations/users/register.validation.js";

class SessionController {
    static logout = (req, res, next) => {
        req.session.destroy((err) => {
            if (err) next(err);
        });

        res.status(200).send({status: "success", message: "You have successfully logged out"});
    }

    static login = async (req, res, next) => {
        try {
            const user = await loginSchema.parseAsync(req.body);
            const manager = new SessionManager();
            await manager.validate(user);
            const token = generateToken(user);
            res.status(200).send({status: "success", message: "You have successfully logged in", token});
        } catch(err) {
            next(err);
        }
    }

    static signup = async (req, res, next) => {
        try {
            const user = await registerSchema.parseAsync(req.body);
            const manager = new SessionManager();
            await manager.create(user);
            res.status(200).send({status: 'success', message: 'You have successfully registered'})
        } catch(err) {
            next(err);
        }
    }
}

export default SessionController;
