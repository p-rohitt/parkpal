const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    console.log("Register hit")
    const { email, password } = req.body;
    console.log(email)
    console.log(password)

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = await createUser(email, password);
        console.log(newUser)
        const token = jwt.sign({ userId: newUser.userId, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '9999h' });
        res.status(201).json({ message: 'User created successfully', userId: newUser.userId,token:token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '9999h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
