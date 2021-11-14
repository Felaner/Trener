const {body} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Некорректный email')
        .custom(async (value, {req}) => {
            const user = await User.findOne({ where: {email: value} });
            if (user) {
                return Promise.reject('Email уже используется');
            }
        }),
    body('password')
        .isLength({min: 6, max: 56}).withMessage('Минимальная длина пароля: 6 символов')
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Пароли не совпадают');
            }
            return true;
        })
        .trim(),
    body('name')
        .isLength({min: 2}).withMessage('Минимальная длина имени: 2 символа')
        .trim()
]
exports.loginValidators = [
    body('email')
        .custom(async (value, {req}) => {
            const candidate = await User.findOne({ where: {email: value} });
            if (!candidate) {
                return Promise.reject('Неверный email или пароль');
            }
        }),
    body('password')
        .custom(async (value, {req}) => {
            const {email} = req.body;
            const candidate = await User.findOne({ where: {email} })
            const areSame = await bcrypt.compare(value, candidate.password);
            if (!areSame) {
                throw new Error('Неверный email или пароль');
            }
        })
]
exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Min length: 3').trim(),
    body('price').isNumeric().withMessage('Enter the entered price').trim(),
    body('img').isURL().withMessage('Enter the entered URL')
]