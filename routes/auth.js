const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {validationResult} = require('express-validator');
const crypto = require('crypto');
const router = Router();
const mailer = require('../mailer/mail');
const {read} = require('fs');
const {registerValidators, loginValidators} = require('../utils/validators');
const { BASE_URL } = require('../keys/index')


router.get('/login', async (req, res) => {
    try {
        res.render('auth/login', {
            title: 'Вход',
            isLogin: true,
            loginError: req.flash('loginError'),
            registerError: req.flash('registerError'),
            registerSuccessfully: req.flash('registerSuccessfully'),
            resetEmail: req.flash('resetEmail'),
            resetSuccessfully: req.flash('resetSuccessfully')
        });
    } catch(e) {
        console.log(e);
    }
});

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/auth/login')
        })
    } catch(e) {
        console.log(e);
    }
});

router.post('/login', loginValidators, async (req, res) => {
    try {
        const {email} = req.body;
        const candidate = await User.findOne({ where: {email} })
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('loginError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login')
        }
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save(err => {
            if (err) {
                throw err
            }
            res.redirect('/');
        });
    } catch(e) {
        console.log(e);
    }
})

router.post('/register', registerValidators, async (req, res, next) => {
    try {
        const {email, password, name} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login#register')
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({
            email,
            name,
            password: hashPassword
        })
        const message = {
            to: email,
            html: `<h2>${name} вы успешно зарегистрировались.</h2>`,
            subject: 'Добро пожаловать'
        };
        mailer(message)
        req.flash('registerSuccessfully', 'Вы успешно зарегистрировались')
        res.redirect('/auth/login');
    } catch(e) {
        console.log(e);
    }
});

router.get('/reset', (req, res) => {
    res.render('auth/reset',{
        title: 'Forgot your password?',
        error: req.flash('error')
    })
})

router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                req.flash('error', 'Что-то пошло не так, попробуйте позже');
                return res.redirect('/auth/reset');
            }

            const { email } = req.body;

            const token = buffer.toString('hex');
            const candidate = await User.findOne({ where: {email}});

            if (candidate) {
                candidate.resetToken = token;
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
                await candidate.save();
                const message = {
                    to: email,
                    html: `<h2>${candidate.name} если вы сбрасывали пароль, тогда проследуйте по следующей ссылке.</h2><a href="${BASE_URL}/auth/password/${token}">Сменить пароль</a><p>Если это не вы, проигнорируйте данное сообщение</p>`,
                    subject: 'Сброс пароля'
                };
                mailer(message)
                req.flash('resetEmail', 'Письмо отправлено, проверьте почту')
                res.redirect('/auth/login');
            } else {
                req.flash('error', 'Пользователя с таким email не существует');
                res.redirect('/auth/reset');
            }
        })
    } catch(e) {
        console.dir(e);
    }
})


router.get('/password/:token', async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/auth/login');
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token
        });

        if (!user) {
            return res.redirect('/auth/login');
        } else {
            res.render('auth/password', {
                title: 'ExpTech | Password',
                error: req.flash('error'),
                userId: user.id.toString(),
                token: req.params.token
            })
        }
    } catch(e) {
        console.dir(e);
    }
})

router.post('/password', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.body.userId,
                resetToken: req.body.token
            }
        })

        if (user) {
            user.password = await bcrypt.hash(req.body.password, 10);
            user.resetToken = undefined;
            user.resetTokenExp = undefined;
            await user.save();
            req.flash('resetSuccessfully', 'Пароль успешно изменен')
            res.redirect('/auth/login');
        } else {
            req.flash('loginError', 'Срок действия ссылки закончился, повторите запрос на смену пароля');
            res.redirect('/auth/login');
        }
    } catch(e) {
        console.dir(e);
    }
})

module.exports = router;