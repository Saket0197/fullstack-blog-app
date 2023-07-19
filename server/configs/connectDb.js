const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = async () => {
   try {
    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // console.log('connection to blogApp DB successful');
   } catch(err) {
        console.log('Error in DB Connection');
        console.error(err.message);
   }
}

module.exports = connectDb;
