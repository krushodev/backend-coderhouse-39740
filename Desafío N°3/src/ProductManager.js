import fs from "fs/promises";

class ProductManager {
    #products;
    #autoID;
    #path = './products.json';

    async getProducts() {
        try {
            const products = await fs.readFile(this.#path, 'utf-8');

            return JSON.parse(products);

        } catch (error) {
            console.log(`Sorry, your file ${this.#path} doesn't exist. It will be created now...`);
            await fs.writeFile(this.#path, '[]');

            return [];
        }
    }

    async getData() {
        this.#products = await this.getProducts();

        if (this.#products.length > 0) {
            this.#autoID = this.#products.length + 1;
        } else {
            this.#autoID = 1;
        }
    }

    async addProduct(product) {
        await this.getData();
        const isInArray = this.#products.some((el) => el.code === product.code);
        const testValues = Object.values(product).every((value) => value);

        if (isInArray) {
            throw new Error(`Your product is already in the list: ${product.title}, code: ${product.code}`);
        }

        if (!testValues) {
            throw new Error(`Please, verify the values of the product: ${product.title}, code: ${product.code}`);
        }
        
        this.#products.push({...product, id: this.#autoID});
        this.#autoID++;
        await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2));
    }

    async getProductById(id) {
        await this.getData();
        const product = this.#products.find(product => product.id === id);

        if (!product) {
            throw new Error('Not found');
        }

        return product;
    }

    async updateProduct(id, update) {
        await this.getData();
        const product = this.#products.findIndex(product => product.id === id);

        if (product === -1) {
            return false;
        }

        this.#products[product] = {...this.#products[product], ...update, id: id};
        await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2));

        return true;
    }

    async deleteProduct(id) {
        await this.getData();
        const isInArray = this.#products.some((product) => product.id === id);

        if (!isInArray) {return false}

        const newProducts = this.#products.filter(product => product.id !== id);
        await fs.writeFile(this.#path, JSON.stringify(newProducts, null, 2));

        return true;
    }
}

export default ProductManager;