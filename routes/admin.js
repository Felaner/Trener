'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const { user: User, character: Character, course: Course } = require('../models/user');
const admin = require('../middleware/admin');


router.get('/', admin, async(req, res) => {
    await User.findOne({
        include: {
            model: Character
        },
        where: {
            id: req.user.id
        }
    }).then(user => {
        res.render('admin/control', {
            title: 'Панель управления сайтом',
            isAdmin: true,
            user
        });
    })
});

router.get('/users', admin, async(req, res) => {
    await User.findAll({
        include: {
            model: Character
        },
        where: {
            isAdmin: 0
        }
    }).then(users => {
        User.findOne({
            include: {
                model: Character
            },
            where: {
                id: req.user.id
            }
        }).then(user => {
            res.render('admin/users', {
                title: 'Пользователи',
                isAdmin: true,
                user,
                users
            });
        })
    })
});

router.get('/courses', admin, async(req, res) => {
    await Course.findAll()
        .then(courses => {
            User.findOne({
                include: {
                    model: Character
                },
                where: {
                    id: req.user.id
                }
            }).then(user => {
                res.render('admin/users', {
                    title: 'Пользователи',
                    isAdmin: true,
                    user,
                    courses
                });
            })
    })
});

module.exports = router;