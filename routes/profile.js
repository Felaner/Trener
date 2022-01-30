'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const auth = require('../middleware/auth');
const { user: User, character: Character } = require('../models/user');
const Courses = require('../models/course');

router.get('/', auth, async (req, res) => {
    const user = await User.findOne({
        include: {
            model: Character
        },
        where: {
            id: req.user.id
        }
    })
    const course = await Courses.findOne({
        where: {id: user.course},
        attributes: [
            'name',
            'description',
            'duration'
        ]
    })
    res.render('profile', {
        title: 'Личный кабинет',
        isProfile: true,
        user,
        course
    });
});

router.post('/', auth, async (req, res) => {
    const character = await Character.findOne({where: {userId: req.user.id}})
    const {0: growth, 1: weight, 2: bust, 3: waist, 4: girth} = req.body
    if (!character) {
        await Character.create({
            growth, weight, bust, waist, girth,
            userId: req.user.id
        })
    } else {
        await character.update({
            growth, weight, bust, waist, girth
        })
    }
    res.status(200)
});

module.exports = router;