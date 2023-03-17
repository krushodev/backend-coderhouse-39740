const fs = require('fs').promises;

class ProductManager {
    #products;
    #autoID;
    #path = './products.json';

    async addProduct(product) {
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

    getProductById(id) {
        const product = this.#products.find(product => product.id === id);

        if (!product) {
            throw new Error('Not found');
        }

        return product;
    }

    async updateProduct(id, update) {
        const product = this.#products.findIndex(product => product.id === id);

        if (product === -1) {
            throw new Error('Not found');
        }

        this.#products[product] = {...this.#products[product], ...update, id: id};

        await fs.writeFile(this.#path, JSON.stringify(this.#products, null, 2));
    }

    async deleteProduct(id) {
        const newProducts = this.#products.filter(product => product.id !== id);

        await fs.writeFile(this.#path, JSON.stringify(newProducts, null, 2));
    }
}

const productsDB = [
    {
        title: 'Producto1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 100,
        thumbnail: 'image.png',
        code: 'AbiiaUXMGu',
        stock: 4
    },
    {
        title: 'Producto2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 100,
        thumbnail: 'image.png',
        code: '3qwaFPTWz8',
        stock: 10
    },
    {
        title: 'Producto3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 100,
        thumbnail: 'image.png',
        code: 'K3T70Bkuhw',
        stock: 8
    }
];

const productManager = new ProductManager();

const test = async () => {
    await productManager.getData();

    console.log(await productManager.getProducts()); // []

    await productManager.addProduct(productsDB[0]);

    await productManager.addProduct(productsDB[1]);

    productManager.updateProduct(2, {title: 'Example change', price: 550, description: 'New description'});

    // productManager.addProduct(productsDB[0]) // Error

    console.log(productManager.getProductById(2)); // {...}

    console.log(await productManager.getProducts()); // [...]
}

test();