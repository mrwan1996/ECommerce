import { Router } from "express";
import * as controllers from './user.endPoint.js'
import { validation } from "../../middleware/validation.js";
import {fileUpload,fileValidation} from '../../utils/multer.js'
import { signupvalidation } from "./user.validation.js";

const router = Router()

router.post('/adduser',fileUpload(fileValidation.image).single("image"),validation(signupvalidation),controllers.signup)
router.get('/conformationemail/:token',controllers.confirm)
router.post('/login',controllers.login)


export default router