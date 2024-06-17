// const bcrypt = require('bcrypt');

// const { docClient } = require('../config/dynamodb-config');
// const { PutCommand, GetCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

// const tableName = 'Users';

// const createUser = async (email, password) => {
//     const userId = uuidv4(); // Generate a unique userId
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const params = {
//         TableName: tableName,
//         Item: {
//             userId: userId,
//             email: email,
//             password: hashedPassword
//         }
//     };

//     await docClient.send(new PutCommand(params));
//     return { userId, email };
// };

// const getUserByEmail = async (email) => {
//     const params = {
//         TableName: tableName,
//         IndexName: 'EmailIndex',
//         KeyConditionExpression: 'email = :email',
//         ExpressionAttributeValues: {
//             ':email': email
//         }
//     };

//     const result = await docClient.send(new QueryCommand(params));
//     return result.Items ? result.Items[0] : null;
// };

// const getUserById = async (userId) => {
//     const params = {
//         TableName: tableName,
//         Key: {
//             userId: userId
//         }
//     };

//     const result = await docClient.send(new GetCommand(params));
//     return result.Item;
// };

// module.exports = { createUser, getUserByEmail, getUserById };




// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Vehicle } = require('./vehicle');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    vehicles: [{
        type: mongoose.Schema.Types.String,
        ref: 'Vehicle'
    }]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

// Service functions

const createUser = async (email, password) => {
    const userId = uuidv4(); // Generate a unique userId
    const user = new User({
        userId: userId,
        email: email,
        password: password
    });

    await user.save();
    return { userId, email };
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email }).exec();
    console.log("Fetched", user);
    return user;
};

const getUserById = async (userId) => {
    const user = await User.findOne({ userId: userId }).exec();
    return user;
};

module.exports = { User, createUser, getUserByEmail, getUserById };

