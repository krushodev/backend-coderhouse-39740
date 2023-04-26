import { CartModel } from "../../models/carts.model.js";

class CartsMongooseDao {
    async findOne(id) {
        try {
            const cartDoc = await CartModel.findById(id);

            return {
                id: cartDoc._id,
                products: cartDoc.products
            };  
        } catch (err) {
            throw new Error(err); 
        }
    }

    async save() {
        try {
            const newCartDoc = new CartModel();
            newCartDoc.save();

            return {
                id: newCartDoc._id,
                products: newCartDoc.products  
            };
        } catch (err) {
            throw new Error(err);
        }
    }

    async insertOne(cid, pid) {
        try {
            const cartDoc = await CartModel.findById(cid);
            const productInCart = cartDoc.products.find(product => product.id === pid);

            productInCart ? productInCart.quantity += 1 : cartDoc.products = [...cartDoc.products , {_id: pid, quantity: 1}];

            await CartModel.findByIdAndUpdate(cid, cartDoc, {new: true});

            return {
                id: cartDoc._id,
                products: cartDoc.products
            };  
        } catch (err) {
            throw new Error(err); 
        }
    }
}

export default CartsMongooseDao;
