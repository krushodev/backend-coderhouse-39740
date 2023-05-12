import { createHash, isValidPassword, isValidEmail } from "../helper/helper.js";
import UsersMongooseDao from "../dao/users/UsersMongooseDao.js";

class SessionManager {
    #dao = new UsersMongooseDao();

    async create(user) {
        try {
            const {firstName, lastName, email, password} = user;

            const validateUser = {
                firstName: firstName.length > 0 ? firstName.trim() : null,
                lastName: lastName.length > 0 ? lastName.trim() : null, 
                email: (email.length > 0 && isValidEmail(email)) ? email.toLowerCase().trim() : null, 
                password: createHash(password)
            }

            const isValid = Object.values(validateUser).every(value => value);

            if(!isValid) {
                throw new Error("Campos incorrectos, intenta de nuevo");
            }
            
            return await this.#dao.insertOne(validateUser);
        } catch (err) {
            throw new Error(err);
        }
    }

    async validate(email, password) {
        try {
            const validateEmail = (email.length > 0 && isValidEmail(email)) ? email.toLowerCase().trim() : null;
            const validatePassword = password.length > 0 ? password.trim() : null;


            if (!(validateEmail && validatePassword)) {
                throw new Error("Campos incorrectos, intenta de nuevo");
            }

            const user = await this.#dao.findByEmail(validateEmail);
            
            if(!isValidPassword(user, validatePassword)) {
                throw new Error("Contraseña incorrecta");
            } 

            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default SessionManager;
