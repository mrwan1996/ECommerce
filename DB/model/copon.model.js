import mongoose, { Schema } from "mongoose";

const cuponschema = new Schema({
    name:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
        default:"0"
    },
    usedby:{
        type:String,
        required:false,
    },
    createdby:{
        type:mongoose.Types.ObjectId,
        required:false,
        ref:'usermodel'
    },
    image:{
        type:Object,
        required:false
    }
},
{
    timestamps:true
}
)
const cuponmodel = mongoose.model('cupon',cuponschema)

export default cuponmodel