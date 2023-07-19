const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

function isTypeSupported(fileName) {
    const supportedTypes = ['jpg', 'jpeg', 'png'];
    return supportedTypes.includes(fileName.split('.')[1].toLowerCase());
}

async function uploadFile(file,publicId='') {
    if(!isTypeSupported(file.originalname)) {
        throw new Error('File Type Not Supported') ;
    }
    try {
       const b64 = Buffer.from(file.buffer).toString('base64');
       const coverImage = 'data:'+file.mimetype+';base64,'+b64;
       const uploadOptions = {
        folder: process.env.FOLDER_NAME,
        resource_type: 'auto',
        quality:100
       };
       const uploadResponse = await cloudinary.uploader.upload(coverImage,uploadOptions);
       if(publicId){
        await cloudinary.uploader.destroy(publicId);
       }
       return uploadResponse;
    
    } catch(err) {
        console.log("Error in Uploading File");
        console.error(err.message);
    }
}

module.exports = uploadFile;