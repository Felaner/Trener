const {body} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Invalid email')
        .custom(async (value, {req}) => {
            const user = await User.findOne({ where: {email: value} });
            if (user) {
                return Promise.reject('Email already exists');
            }
        }),
    body('password')
        .isLength({min: 6, max: 56}).withMessage('min lenght password: 6')
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password mismatch');
            }
            return true;
        })
        .trim(),
    body('name')
        .isLength({min: 2}).withMessage('min lenght: 2')
        .trim()
]
exports.loginValidators = [
    body('email')
        .custom(async (value, {req}) => {
            const candidate = await User.findOne({ where: {email: value} });
            if (!candidate) {
                return Promise.reject('Invalid email or password');
            }
        }),
    body('password')
        .custom(async (value, {req}) => {
            const {email} = req.body;
            const candidate = await User.findOne({ where: {email} })
            const areSame = await bcrypt.compare(value, candidate.password);
            if (!areSame) {
                throw new Error('Invalid email or password');
            }
        })
]
exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Min length: 3').trim(),
    body('price').isNumeric().withMessage('Enter the entered price').trim(),
    body('img').isURL().withMessage('Enter the entered URL')
]