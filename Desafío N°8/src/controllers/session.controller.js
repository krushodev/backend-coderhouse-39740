import SessionManager from "../managers/SessionManager.js";

class SessionController {
    static logout = (req, res) => {
        req.session.destroy((err) => {
            if (err) return res.status(500).send({status: 'error', error: err.message})
        });

        res.status(200).send({status: "success", message: "Te has deslogueado exitosamente"});
    }

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const manager = new SessionManager();
            await manager.validate(email, password);
            req.session.user = { email };
            res.status(200).send({status: "success", message: "Te has logueado exitosamente"});
        } catch(err) {
            res.status(404).send({status: 'error', error: err.message});
        }
    }

    static signup = async (req, res) => {
        try {
            const manager = new SessionManager();
            await manager.create(req.body);
            res.status(200).send({status: 'success', message: 'Te has registrado exitosamente'})
        } catch(err) {
            res.status(400).send({status: 'error', error: err.message});
        }
    }
}

export default SessionController;
