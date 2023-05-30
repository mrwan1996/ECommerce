import { Router } from "express";
import * as controller from './coupon.endPoint.js'
import {fileUpload,fileValidation} from '../../utils/multer.js'
const router = Router()

router.get ( '/',fileUpload(fileValidation.image).single("image"),controller.newcupon)
router.put ( '/update/:id',fileUpload(fileValidation.image).single("image"),controller.update_coupon)


export default router