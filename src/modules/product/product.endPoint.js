import slugify from "slugify"
import brandModel from "../../../DB/model/brand.model .js"
import subcategoryModel from "../../../DB/model/subcategory.model.js"
import cloudinary from '../../utils/cloudinary.js'
import productModel from "../../../DB/model/product.model.js"


export const addproduct = async (req,res,next)=>{
   try {
    const {name ,category,subcategory,brand ,price,discount }=req.body
    const {_id }=req.user
    if(!await subcategoryModel.findOne({_id:subcategory,categoryid:category}))
    {
        return res.status(401).json ({message:'no category found'})
    }
    if(!await brandModel.findOne({_id:brand}))
    {
        return res.status(401).json ({message:'no brand found'})
    }
    const slug = slugify (name , '_')
    req.body.slug = slug

    const newprice = price * (1- ((discount||0)/100))
    req.body.finalprice = newprice


    const{secure_url , public_id}=await cloudinary.uploader.upload(req.files.image[0].path,{file:'product main images'})
    req.body.image = {secure_url , public_id} 

    if (req.files?.subimage?.length){
        req.body.subimage= []
        for (const image of req.body.subimage) {
            const{secure_url , public_id}=await cloudinary.uploader.upload(image.path,{folder:'product sub images'})
            req.body.subimage.push({secure_url , public_id})
        }
    }
const product = await productModel.create(req.body)
if (product){
    res.status(400).json({message:'done',data:product})
}else{
    res.json({message:'unkown error'})
}
   } catch (error) {
    res.json({message:'catoucha'})
    console.log(error);
   }
}