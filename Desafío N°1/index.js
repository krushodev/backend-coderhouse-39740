class ProductManager {
    #products = [];
    #autoID = 1;

    addProduct(product) {
        const isInArray = this.#products.some((item) => item.code === product.code);

        const testValues = Object.values(product).every((value) => value);

        if (isInArray) {
            throw new Error(`Your product is already in the list: ${product.title}, code: ${product.code}`);
        }

        if (!testValues) {
            throw new Error(`Verify the values of the product: ${product.title}, code: ${product.code}`);
        }
        
        this.#products.push({...product, id: this.#autoID});

        this.#autoID++;
    }

    getProducts() {
        return this.#products;
    }

    getProductById(id) {
        const product = this.#products.find(product => product.id === id);

        if (!product) {
            throw new Error('Not found')
        }

        return product;
    }
}

const productManager = new ProductManager();

productManager.getProducts(); // []

// Get random code.

function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
}

const productsDB = [
    {
        title: 'Producto1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 100,
        thumbnail: 'image.png',
        code: generateCode(),
        stock: 4
    },
    {
        title: 'Producto2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 100,
        thumbnail: 'image.png',
        code: generateCode(),
        stock: 10
    },
    {
        title: 'Producto3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 100,
        thumbnail: 'image.png',
        code: generateCode(),
        stock: 8
    }
];

productsDB.forEach(product => productManager.addProduct(product));

productManager.getProducts(); // [...]

productManager.getProductById(2); // {...}

productManager.getProductById(5); // Error: 'Not found'