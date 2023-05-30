import * as dotenv from 'dotenv'
dotenv.config()
import cloudinary from 'cloudinary';


cloudinary.v2.config({
    api_key:"376661418367572",
    api_secret:"SekB8oJ8ASu-zepCFTQE76YFndE",
    cloud_name:"dvo88qjdl",
    secure: true
})

export default cloudinary.v2;