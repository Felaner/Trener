'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const auth = require('../middleware/auth');
const User = require('../models/user');
const Courses = require('../models/course');

router.get('/', auth, async (req, res) => {
    const user = await User.findOne({where: {id: 1}})
    const course = Courses.findOne({
        where: {id: user.course},
        attributes: ['name', 'description', 'duration']
    })
    console.log(course)
    res.render('profile', {
        title: 'Личный кабинет',
        isProfile: true,
        course
    });
});

module.exports = router;