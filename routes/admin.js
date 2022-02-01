'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const { user: User, character: Character } = require('../models/user');
const admin = require('../middleware/admin');


router.get('/', admin, async(req, res) => {
    res.render('admin', {
        title: 'Панель управления сайтом',
        isAdmin: true
    });
});

module.exports = router;