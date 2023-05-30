import slugify from "slugify"
import categoryModel from "../../../DB/model/category.model.js"
import cloudinary from "../../utils/cloudinary.js"
import subcategoryModel from "../../../DB/model/subcategory.model.js"

export const new_subcategory = async (req,res,next)=>
{
try {
    const {name,categoryid}=req.body
    const category = await categoryModel.findById(req.body.categoryid)
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{file:'ecommerce/subcatedgory'})
    if (!category) {
        return res.status(401).json({message:'not found cat'})
    } else {
    const slug = slugify(name, '_')
    const subcategory = await subcategoryModel.create({
        name,
        slug:slug,
        image:{secure_url,public_id},
        categoryid
    })
    return res.status(201).json({messag:'done', data:subcategory})
    }

} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 
export const update_subcategory = async (req,res,next)=>
{
try {
    const {categoryid}=req.body
    const subcategory = await subcategoryModel.findOne({_id:req.params.subid,categoryid})
    console.log(subcategory);
    if (subcategory) {
        if(req.body.name){
            subcategory.name = req.body.name,
            subcategory.slug = slugify(req.body.name , '_')
        }if(req.file){
            const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{file:'ecommerce/subcatedgory'})
            await cloudinary.uploader.destroy(subcategory.image.public_id)
            subcategory.image = {secure_url,public_id}
        }
        await subcategory.save()
        return res.status(201).json({messag:'done', data:subcategory})
    } else {
        return res.status(401).json('not found subcate')
    }

} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 
export const get_subcategory = async (req,res,next)=>
{
try {
    const subcategory = await subcategoryModel.find()
    if (subcategory) {
        return res.status(200).json({messag:'done', data:subcategory})
    } else {
        return res.status(401).json('not found cate')
    }

} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 