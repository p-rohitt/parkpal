// // config/mongodb-config.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://rohit:rohit123@cluster0.at5u214.mongodb.net/Parkpal', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true
//         });
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


const mongoose = require('mongoose');
MONGO_URL = 'mongodb+srv://rohit:rohit123@cluster0.at5u214.mongodb.net/Parkpal'
try{
mongoose.connect(MONGO_URL);
console.log("Mongoose connected")
} catch (e) {
    throw new Error ('Error')
}