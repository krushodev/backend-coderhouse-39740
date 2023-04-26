import { Schema, model } from "mongoose";

const productCollection = "products";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    code: {
        type: String,
        required: [true, 'Product code is required'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"]
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    thumbnails: {
        type: String
    }
});

export const ProductModel = model(productCollection, ProductSchema);
