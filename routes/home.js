'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const { user: User, character: Character } = require('../models/user');


router.get('/', async(req, res) => {
    if (req.session.isAuthenticated !== undefined) {
        await User.findOne({
            include: {
                model: Character
            },
            where: {
                id: req.user.id
            }
        }).then(user => {
            res.render('home', {
                title: 'Главная',
                isHome: true,
                user
            });
        })
    } else {
        res.render('home', {
            title: 'Главная',
            isHome: true
        });
    }
});

module.exports = router;