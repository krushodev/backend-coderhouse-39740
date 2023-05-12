import UsersMongooseDao from "../dao/users/UsersMongooseDao.js";

class UserManager {
    #dao = new UsersMongooseDao();

    async getOne(id) {
        try {
            return this.#dao.findOne(id);
        } catch (err) {
           throw new Error(err) 
        }
    }

    async getOneByEmail(email) {
        try {
            return this.#dao.findByEmail(email);
        } catch (err) {
            throw new Error(err)
        }
    }

    async add(user) {
        try {
            return this.#dao.insertOne(user);
        } catch (err) {
            throw new Error(err)
        }
    } 
}

export default UserManager;
