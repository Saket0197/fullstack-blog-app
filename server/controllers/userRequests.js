const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.handleSignup = async (req,res) => {

    try {

        let hashedPass=null;
        const {username, email, password} = req.body;

        // if all fields present
        if(!username || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields required"
            });
        }

        // if user already registered
        const userFound = await user.findOne({email})
        if(userFound) {
            return res.status(401).json({
                success: false,
                message: 'User Already Registered'
            });
        }

        // hashing password
        try {
            hashedPass = await bcrypt.hash(password,10);
        } catch(err) {
            console.log('Error in Hashing Password');
            console.error(err.message);
        }

        // store user in db
        await user.create({username,email,password:hashedPass});
        res.status(200).json({
           success: true,
           message: "User Registered Successfully",
        });

    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Server Error in User Signup",
        });
    }
}

exports.handleLogin = async(req,res) => {

    try {

        // if all fields present
        const {username,email,password} = req.body;

        if(!username || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            });
        }

        // if user not present in db
        const userFound = await user.findOne({email});
        if(!userFound) {
            return res.status(401).json({
                success: false,
                message: 'User Not Registered'
            });
        }
        
        // verify username & password
        const isPassSame = await bcrypt.compare(password,userFound.password);
        if(!isPassSame || (userFound.username !== username)) {
            return res.status(401).json({
                success: false,
                message: "Username or password is incorrect"
            });
        }

        // pending - create jwt & send in cookie
        const payload = {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '5h'});

        // const cookieOptions = {
        //     expires: new Date(Date.now() + 2*60*60*1000),
        //     httpOnly: true,
        // }

        userFound.password = null;
        userFound.email = null;
        // res.cookie('token',token,cookieOptions).status(200).json({
        //     success: true,
        //     message: 'Login Successful',
        //     data: userFound
        // });

        res.status(200).json({
            success:true,
            message: "Login Successful",
            data: {id:userFound._id,username:userFound.username},
            token: token
        });

    } catch(err) {
            res.status(500).json({
                success: false,
                message: 'Server Error in User Login'
            });
    }
}