const uploadFile = require('../utils/uploadFile');
const deleteUploadedFile = require('../utils/deleteUploadedFile');
const Blog = require('../models/blogModel');

exports.createBlog = async(req,res) => {

    try {
        const {title,summary,content} = req.body;
        const id = req.user.id;
        const image = req.file; 

        if(!title || !summary || !content || !image) {
            return res.json({
                success: false,
                message: "All Fields Required"
            });
        }

        if(!id) {
            return res.status(401).json({
                success:false,
                message:'Unknown User'
            });
        }

        try{
            const uploadResponse = await uploadFile(image);
            const createdBlog = await Blog.create({title,summary,content,coverImage:uploadResponse.secure_url,blogger:id, publicId:uploadResponse.public_id});
            res.status(200).json({
                success: true,
                message: 'Blog Creation Successful',
                data:createdBlog
            });
        } catch(err) {
            console.log('Error in File Type');
            console.error(err.message);
        }

    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
   
}

exports.getAllBlogs = async(req,res) => {
    try{
        const allBlogs = await Blog.find().sort({updatedAt:-1,createdAt:-1}).limit(10).populate('blogger',['username']);
        res.status(200).json({
            success:true,
            message: "Blogs Fetch Successful",
            data: allBlogs
        });
    } catch(err) {
        console.log('Error while fetching Blogs');
        console.error(err.message);
    }
}

exports.editBlog = async(req,res) => {
    try {
        const {title,summary,content,blogId} = req.body;
        const id = req.user.id;
        const image = req.file; 

        if(!title && !summary && !content && !image) {
            return res.json({
                success: false,
                message: "Nothing To Edit"
            });
        }

        if(!id || !blogId) {
            return res.status(401).json({
                success:false,
                message:'Unknown User'
            });
        }

        const foundUser = await Blog.findById(blogId);

        if(foundUser) {
            try{
                let updatedBlog = null;
                if(title)
                    foundUser.title = title;
                if(summary)
                    foundUser.summary = summary;
                if(content)
                    foundUser.content = content;
                try {
                    if(image) {
                        const uploadResponse = await uploadFile(image,foundUser.publicId);
                        foundUser.coverImage = uploadResponse.secure_url;
                        foundUser.publicId = uploadResponse.public_id;
                    }
                } catch(err) {
                    console.log('Error in File Type');
                    console.error(err.message);
                }
                updatedBlog = await foundUser.save();
                res.status(200).json({
                    success: true,
                    message: 'Blog Updation Successful',
                    data:updatedBlog
                });
            } catch(err) {
                console.log('Error in Updating Blog');
                console.error(err.message);
            }
        }

    } catch(err) {
        res.status(500).json({
           succss:false,
           message:"Server Error" 
        });
    }
}

exports.deleteBlog = async(req,res) => {

    try{
        const {bid} = req.params;
        if(!bid) {
            return res.status(401).json({
                success: false,
                message: 'Unknown Blog reference'
            });
        }
        const foundBlog = await Blog.findById(bid);
        if(!foundBlog){
            return res.json({
                success: false,
                message: 'Blog Not Found'
            });
        }
        try{
            await deleteUploadedFile(foundBlog.publicId);
            await Blog.deleteOne({_id:bid});
            res.status(200).json({
                success:true,
                message: 'Blog Deleted Successfully'
            });
        } catch(err) {
            console.log('Error while Deleting cover image');
            console.err(err.message);
        }
        
    } catch(err) {
        res.status(500).json({
            success:false,
            message: 'Server Error while Deleting Blog'
        });
    }
}