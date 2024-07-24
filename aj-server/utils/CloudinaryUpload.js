require("dotenv").config()
const  cloudinary =require( 'cloudinary').v2;
const  fs =require( 'fs');
const ConfigCloudinary = () => {
    const {CloudName,api_key_C,api_secret_C} = process.env
    cloudinary.config({ 
      cloud_name: CloudName, 
      api_key: api_key_C, 
      api_secret: api_secret_C
    });
}
const UploadCloudinary = async (LocalFilePath) => {
    try{

        if(!LocalFilePath) {return null}
        else{
       const response = await cloudinary.uploader.upload(LocalFilePath,
       { resource_type:"auto"})
       console.log("File Url :" ,response.url)
  return response
    }}
    catch(err){
        fs.unlinkSync(LocalFilePath)
        return null
    }
}
module.exports={ConfigCloudinary,UploadCloudinary}