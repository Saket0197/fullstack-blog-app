const express = require('express');
const router = express.Router();
const {handleSignup,handleLogin} = require('../controllers/userRequests');
const auth = require('../middlewares/auth');

router.post('/signup',handleSignup);
router.post('/login',handleLogin);
router.get('/session',auth,(req,res) => {
    res.status(200).json({
        success:true,
        message: 'User is Authenticated',
        data: req.user
    });
});

module.exports = router;