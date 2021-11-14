'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    res.render('profile', {
        title: 'Личный кабинет',
        isProfile: true
    });
});

module.exports = router;