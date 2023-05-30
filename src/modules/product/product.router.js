import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileUpload,fileValidation } from "../../utils/multer.js";
import * as controllers from './product.endPoint.js'
const router = Router()

router.post ('/addproduct', fileUpload(fileValidation.image).fields([
    {name:"image", maxcount:1},
    {name : 'subimage'
    ,maxcount:3},
]), 
auth(),controllers.addproduct)

export default router