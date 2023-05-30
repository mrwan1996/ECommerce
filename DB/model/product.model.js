import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'brandName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']
    },
    slug: {
        type:String,
        required: true
    },
    size: {
        type:String,
        required: true
    },
    colour: {
        type:String,
        required: true
    },
    image:{
        type:Object,
        required:true
    },
    subimage:{
        type:[Object]
    },
    price: {
        type:Number,
        required: true
    },
    discount: {
        type:Number,
        required: false
    },

    finalprice: {
        type:Number,
        required: true,
        default : 0
    },
    createdby:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:'user'
    },
    subcategory:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:'subcategory'
    },

    category:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:'category'
    },
    brand:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:'category'
    },
}
, {
    timestamps: true
})
const productModel = model('productModel',productSchema)
export default productModel