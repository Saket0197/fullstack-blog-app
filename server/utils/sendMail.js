const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const dispatchMail = async(userEmail,mailSubject,templateBody) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        transporter.sendMail({
           from:'Blog App | Service',
           to:`${userEmail}`,
           subject:`${mailSubject}`,
           html:`${templateBody}` 
        });

    } catch(err) {
        console.log('Error in Sending Mail');
        console.error(err.message);
    }

}   

module.exports = dispatchMail;