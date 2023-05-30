import { Router } from "express";
const router = Router()
import {fileUpload,fileValidation} from '../../utils/multer.js'
import * as controllers from './category.endPoint.js'
import {auth} from '../../middleware/auth.js'

router.post ('/newcategory',fileUpload(fileValidation.image).single("image"), auth() ,controllers.new_category)
router.put ('/updatecategory/:categoryid',fileUpload(fileValidation.image).single("image"),controllers.update_category)
router.get ('/allcat',controllers.get_category)




export default router