import fs from "fs/promises";
import { resolve } from "path";

class ProductManager {
    #products;
    #autoID;
    #path = resolve("src/data/products.json"); 

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

    validateProduct(product) {
        const {title, description, code, price, status, stock, category} = product;
        if (!(title && description && code && price && status && stock && category)) {
            return false;
        }

        const typeNumber = [+price, +stock];
        const typeString = [title, description, code, category];

        const isNumber = typeNumber.every(item => (typeof item === 'number') && !(Number.isNaN(item)));
        const isString = typeString.every(item => (typeof item === 'string') && (item.length > 0));

        if (!(isNumber && isString)) {
            return false;
        }

        return {...product, price: +price, stock: +stock, title: title.trim(), description: description.trim(), code: code.trim(), category: category.trim()};
    }

    async addProduct(product) {
        await this.getData();

        const validatedProduct = this.validateProduct(product);
        const isInArray = this.#products.some((el) => el.code === product.code);
        
        if (isInArray) {
            throw new Error("Your product is already in the list");
        }

        if (!validatedProduct) {
            throw new Error("Please, verify the values of the product");
        }

        const newProduct = {...validatedProduct, id: this.#autoID};
        
        this.#products.push(newProduct);
        this.#autoID++;
        await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2));

        return newProduct;
    }

    async getProductById(id) {
        await this.getData();
        const product = this.#products.find(product => product.id === id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    async updateProduct(id, update) {
        await this.getData();
        const product = this.#products.findIndex(product => product.id === id);

        if (product === -1) {
            throw new Error("Product not found")
        }

        this.#products[product] = {...this.#products[product], ...update, id: id};
        await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2));
                                               
        return true;
    }

    async deleteProduct(id) {
        await this.getData();
        const isInArray = this.#products.some((product) => product.id === id);

        if (!isInArray) {
            throw new Error("Product not found");
        }

        const newProducts = this.#products.filter(product => product.id !== id);
        await fs.writeFile(this.#path, JSON.stringify(newProducts, null, 2));

        return true;
    }
}

export default ProductManager;
