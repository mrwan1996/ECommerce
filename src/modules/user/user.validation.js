import Joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const signupvalidation ={body:Joi.object().required().keys({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),

    password: generalFields.password.required(),
        

    cpass: Joi.ref('password'),


    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),


    phone: Joi.number()
    .required(),

    role: Joi.string()
    .valid("admin","user")
    .optional(),


})} 
