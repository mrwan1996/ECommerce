import mongoose, { Schema, model } from "mongoose";


const categorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'categoryName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']
    },
    createdby:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'user'
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
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps: true
})
categorySchema.virtual('subcategory',{
    localField:"_id",
    foreignField:"categoryid",
    ref:'subcategory'
})

const categoryModel = model('category', categorySchema)
export default categoryModel