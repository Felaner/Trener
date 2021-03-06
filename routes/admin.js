'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const { user: User, character: Character, course: Course } = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const path = require('path');
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
                res.render('admin/courses', {
                    title: 'Курсы',
                    isAdmin: true,
                    user,
                    courses
                });
            })
    })
});

router.post('/courses/add-course', admin, async(req, res) => {
    try {
        if (req.files['imageCourse']) {
            const dirname = `public/images/courses`

            await req.files['imageCourse'].forEach(el => {
                const filename = uuidv4() + path.parse(el.originalname).ext
                sharp(el.buffer)
                    .rotate()
                    .toFile(dirname + `/${filename}`)
                    .then(result => {
                        const {courseName, courseDuration, coursePrice, courseDescription} = req.body
                        Course.create({
                            name: courseName,
                            description: courseDescription,
                            price: coursePrice,
                            duration: courseDuration,
                            img: `/images/courses/${filename}`
                        }).then(el => {
                            return res.json({
                                id: el.id,
                                courseName,
                                courseDescription,
                                coursePrice,
                                courseDuration,
                                img: `/images/courses/${filename}`
                            })
                        })
                    })
            })
        } else {
            return res.sendStatus(400)
        }
    } catch (e) {
        console.log(e)
    }
});

router.post('/courses/delete-course', admin, async(req, res) => {
    try {
        const {id} = req.body
        await Course.findByPk(id)
            .then(result => {
                fs.stat('public/' + result.img, function(err, stat) {
                    if(err == null) {
                        fs.unlinkSync('public/' + result.img)
                    }
                });
            }).then(e => {
                Course.destroy({
                    where: {
                        id: id
                    }
                })
            }).then(el => {
                return res.sendStatus(200)
            })
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;