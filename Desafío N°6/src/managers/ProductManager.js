import ProductsMongooseDao from "../dao/products/ProductsMongooseDao.js";
import generateCode from "../helper/helper.js";

class ProductManager {
    #dao = new ProductsMongooseDao();

    async getAll(limit) {
        try {
            return this.#dao.find(limit); 
        } catch (err) {
            throw new Error(err);
        }
    }

    async getOne(id) {
        try {
            return this.#dao.findOne(id);
        } catch (err) {
            throw new Error(err);
        }

    }

    async addOne(data) {
        try {
            const product = {...data, code: generateCode()}
            return this.#dao.insertOne(product);
        } catch (err) {
            throw new Error(err); 
        }
    }

    async updateOne(id, update) {
        try {
            return this.#dao.update(id, update);
        } catch (err) {
            throw new Error(err); 
        }
    }

    async deleteOne(id) {
        try {
            return this.#dao.delete(id);
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default ProductManager;
