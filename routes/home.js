'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const Courses = require('../models/course');


router.get('/', (req, res) => {
    res.render('home', {
        title: 'Главная',
        isHome: true
    });
});

module.exports = router;