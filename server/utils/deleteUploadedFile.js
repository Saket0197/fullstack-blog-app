const cloudinary = require('cloudinary').v2;

async function deleteUploadedFile(publicId) {
    try {
       let deletedResponse = null;
       if(publicId){
        deletedResponse = await cloudinary.uploader.destroy(publicId);
       }
       return deletedResponse;
    
    } catch(err) {
        console.log("Error in deleting Uploaded File");
        console.error(err.message);
    }
}

module.exports = deleteUploadedFile;