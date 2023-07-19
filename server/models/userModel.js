const mongoose = require('mongoose');
const userRegistration = require('../mailTemplates/userRegistration');
const dispatchMail = require('../utils/sendMail');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    }

},{
    timestamps: true
});

userSchema.post('save',async (doc) => {
    try {
       await dispatchMail(doc.email,'User Registration',userRegistration(doc.username));
    } catch(err) {
        console.log('Error in Sending Registration Mail');
        console.error(err.message);
    }
});

module.exports = mongoose.model('User',userSchema);