import cuponmodel from "../../../DB/model/copon.model.js";
import cloudinary from '../../utils/cloudinary.js'

export const newcupon = async (req,res,next)=>{
   try {
    if(await cuponmodel.findOne ({name: req.body.name}))
    {
        return res.status(409).json ({message:'allready exist cupon'})
    }
    if(req.file)
    {
        const{secure_url , public_id} = await cloudinary.uploader.upload(req.file.path,{file:'cuopon'})
        req.body.image = {secure_url , public_id}
    }
    const cupon = await cuponmodel.create(req.body)
    cupon
    ?res.status(200).json ({message:'done', cupon})
    :res.json({message:'error'})

   } catch (error) {
    res.json({message:"catch error"})    
    console.log(error);
   }
}

export const update_coupon = async (req,res,next)=>
{
    try {
        const coupon = await cuponmodel.findById(req.params.id)
            if (coupon) {
        if(req.body.name){
            coupon.name = req.body.name
        }
        if(req.body.amount){
            coupon.amount = req.body.amount
        }if(req.file){
            const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{file:'ecommerce/catedgory'})
            if (coupon.image) {
                await cloudinary.uploader.destroy(coupon.image.public_id)
            }
            coupon.image = {secure_url,public_id}
        }
        await coupon.save()
        return res.status(201).json({messag:'done', data:coupon})
    } else {
        return res.status(401).json('not found cate')
    }

} catch (error) {
    console.log(error);
    res.json({message:'error'})
}
} 

