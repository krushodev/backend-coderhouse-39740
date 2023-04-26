import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const cartCollection = "carts";

const CartSchema = new Schema({
    products: {
        type: [{
            _id: {
                type: ObjectId,
                required: [true, "Product ID is required"]
            },
            quantity: {
                type: Number,
                required: [true, "Product quantity is required"]
            }
        }],
        required: [true, "The cart must have products"]
    }
});

export const CartModel = model(cartCollection, CartSchema);
