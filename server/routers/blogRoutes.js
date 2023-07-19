const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {getAllBlogs,createBlog,editBlog,deleteBlog} = require('../controllers/blogRequests');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage,limits:{fileSize:2500000}});
const uploadMiddleware = upload.single('image');

router.post('/create',auth,uploadMiddleware,createBlog);
router.put('/edit-blog',auth,uploadMiddleware,editBlog);
router.get('/getBlogs',getAllBlogs);
router.delete('/delete-blog/:bid',auth,deleteBlog);

module.exports = router;