import slugify from "slugify"
import categoryModel from "../../../DB/model/category.model.js"
import cloudinary from "../../utils/cloudinary.js"

export const new_category = async (req,res,next)=>
{
try {
    const { role , _id}=req.user
    const {name}=req.body
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{file:'ecommerce/catedgory'})

    if ( role !='admin')
    {
        return res.status(400).json({massege:'unauthorized account'})
    }

    const slug = slugify(name, '_')
    const category = await categoryModel.create({
        name,
        slug:slug,
        image:{secure_url,public_id},
        createdby:_id
    })
    return res.status(201).json({messag:'done', data:category})
} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 
export const update_category = async (req,res,next)=>
{
try {
    const category = await categoryModel.findById(req.params.categoryid)
    if (category) {
        if(req.body.name){
            category.name = req.body.name,
            category.slug = slugify(req.body.name , '_')
        }if(req.file){
            const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{file:'ecommerce/catedgory'})
            await cloudinary.uploader.destroy(category.image.public_id)
            category.image = {secure_url,public_id}
        }
        await category.save()
        return res.status(201).json({messag:'done', data:category})
    } else {
        return res.status(401).json('not found cate')
    }

} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 
export const get_category = async (req,res,next)=>
{
try {
    const category = await categoryModel.find().populate([{
        path:'subcategory',
        select:'name'
    }])
    if (category) {
        return res.status(200).json({messag:'done', data:category})
    } else {
        return res.status(401).json('not found cate')
    }

} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 