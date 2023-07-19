const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (req,res,next) => {

    const token = req.header('Authorization').replace('Bearer ','');
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "token missing"
        });
    }

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {
            id:payload.id,
            username:payload.username
        }
        next();
    } catch(err) {
        console.log('Error in token verification');
        console.error(err.message);
        return res.status(401).json({
            success:false,
            message: err.message,
            data:null
        });
    }

}

module.exports = auth;