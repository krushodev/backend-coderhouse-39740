import CartsMongooseDao from "../dao/carts/CartsMongooseDao.js";

class CartManager {
    #dao = new CartsMongooseDao()

    async getOne(id) {
        try {
            return this.#dao.findOne(id);
        } catch (err) {
            throw new Error(err); 
        }
    }

    async addOne() {
        try {
            return this.#dao.save();
        } catch (err) {
            throw new Error(err);
        }

    }

    async addProduct(cid, pid) {
        try {
            return this.#dao.insertOne(cid, pid);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default CartManager;
