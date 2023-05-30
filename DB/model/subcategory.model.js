import mongoose, { Schema, model } from "mongoose";


const subcategorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'subcategoryName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']
    },
    createdby:{
        type:mongoose.Types.ObjectId,
        required:false,

    },
    slug: {
        type:String,
        required: true
    },
    image:{
        type:Object,
        required:true
    },
    categoryid:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'category'
    }

}, {
    timestamps: true
})


const subcategoryModel = model('subcategory', subcategorySchema)
export default subcategoryModel