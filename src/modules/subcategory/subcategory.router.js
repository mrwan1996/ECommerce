import { Router } from "express";
const router = Router()
import {fileUpload,fileValidation} from '../../utils/multer.js'
import * as controllers from './subcategory.endPoint.js'


router.post ('/newsubcategory',fileUpload(fileValidation.image).single("image"),controllers.new_subcategory)
router.put ('/updatesubcategory/:subid',fileUpload(fileValidation.image).single("image"),controllers.update_subcategory)
router.get ('/allsubcat',controllers.get_subcategory)


router.get('/', (req ,res)=>{
    res.status(200).json({message:"SubCategory Module"})
})




export default router