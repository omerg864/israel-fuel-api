const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const crypto = require('crypto');
const sendEmail = require('../middleWare/emailMiddleware');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, position } = req.body;
    if (!email || !password || !name) {
        res.status(400)
        throw new Error('Please provide an email, password and name');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const api_token = crypto.randomBytes(48).toString('base64url');

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        position,
        api_token: api_token,
        verification: false,
    });
    if (user) {
        sendEmail(user.email, 'Verify your email', `Please verify your email by clicking on the link: ${process.env.HOST_ADDRESS}/api/users/verify/${user.api_token}`);
        res.status(201).json({
            message: 'User created successfully',
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            position: user.position,
        });
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        if (!user.verification) {
            res.status(400)
            throw new Error('Please verify your email');
        }
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            api_token: user.api_token,
        });
    } else {
        res.status(400)
        throw new Error('Invalid email or password');
    }
})

const getUser = asyncHandler(async (req, res) => {

    res.status(200).json(req.user);
})

const generateNewAPIToken = asyncHandler(async (req, res) => {

    const api_token = crypto.randomBytes(48).toString('base64url');
    const user = await User.findByIdAndUpdate(req.user._id, { api_token: api_token }, { new: true });

    res.status(200).json({api_token: user.api_token});
})

const verifyUser = asyncHandler(async (req, res) => {

    const user = await User.findOne({ api_token: req.params.token });
    if (user) {
        if (user.verification) {
            res.status(400)
            throw new Error('User already verified');
        }
        await User.findByIdAndUpdate(user._id, { verification: true });
        res.status(200).json({
            message: 'Email verified successfully',
            api_token: user.api_token
        });
    } else {
        res.status(404)
        throw new Error('Invalid URL');
    }
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
    generateNewAPIToken,
    verifyUser
}