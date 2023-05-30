import userModel from "../../../DB/model/User.model.js"
import { generateToken, verifyToken } from "../../utils/GenerateAndVerifyToken.js"
import { hash } from "../../utils/HashAndCompare.js"
import cloudinary from "../../utils/cloudinary.js"
import sendEmail from "../../utils/email.js"

export const signup = async (req,res,next)=>
{
    try {
        const {username , email ,password , cpass ,phone, role } = req.body
        // add photo
        const { secure_url , public_id } = await cloudinary.uploader.upload(req.file.path, {file:'userphoto'})
        if (await userModel.findOne({email}))
        {
            return res.status(400).json({message:'email is already exist'})
        }
        const hashedpass = hash({plaintext:password})        
        // save user  
        const newuser = new userModel({
            username,
            email,
            password:hashedpass,
            phone,
            role,
            image:{secure_url,public_id}
        })
          // send confirmetion email\
    const token = generateToken({payload:{user:newuser}})
    const conformationemail = `${req.protocol}://${req.headers.host}/user/conformationemail/${token}`
    sendEmail({
        to:newuser.email,
        html:`'<a href = ${conformationemail}> click to confirm </a>`,
        subject:'conformation email'})
    if(sendEmail){
        const saved =await newuser.save()
        res.json({ message: 'done', data: newuser })
    }else{
        res.json({ message: 'unknownn error' })
    }
    } catch (error) {
        res.json ({message:'catch error'})       
        console.log(error);
    }
}

export const confirm = async (req,res,next)=>{
try {
    const {token}=req.params
    const user = verifyToken({token})
    const confirmed = await userModel.updateOne(user,{confirmEmail:true})
    confirmed.modifiedCount?
    res.status(200).json({message:'TRY TO LOG IN'})
    :
    res.status(400).json({message:'ERROR'})
} catch (error) {
    res.json ({message:'catch error'})       
    console.log(error);
}


}

export const login = async (req,res,next)=>{
  try {
    const { email , password}=req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message:'the email is not registerd'})
    }if (!user.confirmEmail){
    res.status(400).json({message:'please verfiey your account'})
    }else{
        const passcheck = ({plaintext:password,hashValue:user.password})
        if(!passcheck){
            return res.status(400).json({message:'wrong password'})
        }
        const activation = await userModel.updateOne(user,{active:true})
        if(activation.modifiedCount){
            const token = generateToken({payload:{user:user}})
            res.status(400).json({message:'ok',data:token})
        }else{
            res.status(400).json({message:'error'})
        }
        
    
    }
  } catch (error) {
    res.json ({message:'catch error'})       
    console.log(error);
  }

}
