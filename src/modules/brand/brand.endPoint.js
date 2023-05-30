import slugify from "slugify"
import brandModel from "../../../DB/model/brand.model .js"
import cloudinary from "../../utils/cloudinary.js"

export const new_brand = async (req,res,next)=>
{
try {
    const {name}=req.body
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{file:'ecommerce/catedgory'})
    const slug = slugify(name, '_')
    const brand = await brandModel.create({
        name,
        slug:slug,
        image:{secure_url,public_id}
    })
    return res.status(201).json({messag:'done', data:brand})
} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 
export const update_brand = async (req,res,next)=>
{
try {
    const brand = await brandModel.findById(req.params.brandid)
    if (brand) {
        if(req.body.name){
            brand.name = req.body.name,
            brand.slug = slugify(req.body.name , '_')
        }if(req.file){
            const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{file:'ecommerce/catedgory'})
            await cloudinary.uploader.destroy(brand.image.public_id)
            brand.image = {secure_url,public_id}
        }
        await brand.save()
        return res.status(201).json({messag:'done', data:brand})
    } else {
        return res.status(401).json('not found cate')
    }

} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 
export const get_brand = async (req,res,next)=>
{
try {
    const brand = await brandModel.find()
    if (brand) {
        return res.status(200).json({messag:'done', data:brand})
    } else {
        return res.status(401).json('not found cate')
    }

} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 