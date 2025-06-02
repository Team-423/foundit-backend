import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const itemSchema = new Schema({
    item_name: {
        type: String,
        required: true,
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    location: {
        type: String,
        required: true,
    },
    colour: {
        type: String,
    },
    size: {
        type: String,
    },
    brand: {
        type: String,
    },
    material: {
        type: String,
    },
    resolved: {
        type: Boolean,
        default: false,
    },
    found: {
        type: Boolean,
        required: true,
    },
    lost: {
        type: Boolean,
        required: true,
    },
})

const Item = model('Item', itemSchema)

export default Item;
