const express = require('express');
const app = express();
const connectDb = require('./configs/connectDb');
const connectCloudinary = require('./configs/connectCloudinary');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routers/userRoutes');
const blogRouter = require('./routers/blogRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// connections
connectDb();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}));

// route mounting
app.use('/user',userRouter);
app.use('/blog',blogRouter);

// initiate server
app.listen(PORT,() => {
    console.log(`App is listening at Port: ${PORT}`);
});