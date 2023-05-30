import { Router } from "express";

const router = Router()
import {fileUpload,fileValidation} from '../../utils/multer.js'
import * as controllers from '../brand/brand.endPoint.js'

router.post ('/newbrand',fileUpload(fileValidation.image).single("image"),controllers.new_brand)
router.put ('/updatebrand/:brandid',fileUpload(fileValidation.image).single("image"),controllers.update_brand)
router.get ('/allbrand', controllers.get_brand)


export default router