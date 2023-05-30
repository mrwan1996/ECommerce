import mongoose, { Schema, model } from "mongoose";

const brandSchema = new Schema({

    name: {
        type: String,
        required: [true, 'brandName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']
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
    slug: {
        type:String,
        required: true
    },
    image:{
        type:Object,
        required:true
    }

}, {
    timestamps: true
})
const brandModel = model('brand', brandSchema)
export default brandModel