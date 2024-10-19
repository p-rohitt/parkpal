// config/mongodb-config.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://rohit:rohit123@cluster0.at5u214.mongodb.net/Parkpal');
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         process.exit(1);
//     }
// };

// connectDB();

// module.exports = connectDB;


// // const mongoose = require('mongoose');
// MONGO_URL = 'mongodb://rohit:rohit123@cluster0.at5u214.mongodb.net:27017/Parkpal'
// try{ mongoose.connect(MONGO_URL);
// console.log("Mongoose connected")
// } catch (e) {
//     throw new Error ('Error')
// }



const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Database connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
