const mongoose = require('mongoose');
const blogCreation = require('../mailTemplates/blogCreation');
const dispatchMail = require('../utils/sendMail');
const User = require('./userModel');

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        maxLength: 150,
        required: true,
    },

    summary: {
        type: String,
        maxLength: 350,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    coverImage: {
        type: String,
        required: true
    },

    publicId:{
        type:String,
        required:true
    },

    blogger: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{
    timestamps: true
});

blogSchema.post('save',async (doc) => {
    try {
       const foundUser = await User.findById(doc.blogger._id); 
       await dispatchMail(foundUser.email,'Blog Creation',blogCreation(foundUser.username,doc.coverImage));
    } catch(err) {
        console.log('Error in Sending Blog Creation Mail');
        console.error(err.message);
    }
});

module.exports = mongoose.model('Blog',blogSchema);