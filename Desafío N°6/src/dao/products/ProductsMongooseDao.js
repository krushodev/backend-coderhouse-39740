import { ProductModel } from "../../models/products.model.js";

class ProductsMongooseDao {
    async find(limit) {
        try {
            const isLimit = limit > 0;
            const productsDocs = isLimit ? await ProductModel.find().limit(limit) : await ProductModel.find();

            return productsDocs.map((doc) => ({
                id: doc._id,
                title: doc.title,
                description: doc.description,
                price: doc.price,
                thumbnails: doc.thumbnails ?? null,
                category: doc.category,
                code: doc.code,
                status: doc.status,
                stock: doc.stock
            }));
        } catch (err) {
            throw new Error(err);
        }
    }

    async findOne(id) {
        try {
            const productDoc = await ProductModel.findById(id);

            return {
                id: productDoc._id,
                title: productDoc.title,
                description: productDoc.description,
                price: productDoc.price,
                thumbnails: productDoc.thumbnails ?? null,
                category: productDoc.category,
                code: productDoc.code,
                status: productDoc.status,
                stock: productDoc.stock
            };
        } catch (err) {
            throw new Error(err);
        }
    }

    async insertOne(product) {
        try {
            const newProductDoc = new ProductModel(product);
            await newProductDoc.save();

            return true;
        } catch (err) {
            throw new Error(err); 
        }
    }

    async update(id, update) {
        try {
            const productDoc = await ProductModel.findByIdAndUpdate(id, update, {new: true});

            return {
                id: productDoc._id,
                title: productDoc.title,
                description: productDoc.description,
                price: productDoc.price,
                thumbnails: productDoc.thumbnails ?? null,
                category: productDoc.category,
                code: productDoc.code,
                status: productDoc.status,
                stock: productDoc.stock
            };
        } catch (err) {
            throw new Error(err); 
        }
    }

    async delete(id) {
        try {
            await ProductModel.findByIdAndUpdate(id, {status: false}, {new: true});

            return true;
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default ProductsMongooseDao;