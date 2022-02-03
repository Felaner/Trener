'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const auth = require('../middleware/auth');
const sharp = require('sharp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { user: User, character: Character } = require('../models/user');

router.get('/', auth, async (req, res) => {
    const user = await User.findOne({
        include: {
            model: Character
        },
        where: {
            id: req.user.id
        }
    })
    res.render('profile', {
        title: 'Личный кабинет',
        isProfile: true,
        user
    });
});

router.post('/', auth, async (req, res) => {
    const user = await User.findOne({where: {id: req.user.id}})
    const character = await Character.findOne({where: {userId: req.user.id}})
    const {0: growth, 1: weight, 2: bust, 3: waist, 4: girth, profileName: name} = req.body
    await user.update({
        name
    })
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
    return res.sendStatus(200)
});

router.post('/edit-image', auth, async (req, res) => {
    try {
        const character = await Character.findOne({where: {userId: req.user.id}})
        if (req.files['imageSelect']) {
            const dirname = `public/images/avatars`

            await req.files['imageSelect'].forEach(el => {
                const filename = uuidv4() + path.parse(el.originalname).ext
                sharp(el.buffer)
                    .rotate()
                    .toFile(dirname + `/${filename}`)
                    .then(result => {
                        if (!character) {
                            Character.create({
                                image: `/images/avatars/${filename}`,
                                userId: req.user.id
                            }).then(el => {
                                return res.json({img: `/images/avatars/${filename}`})
                            })
                        } else {
                            if (character.image) {
                                fs.unlinkSync('public/' + character.image)
                            }
                            character.update({
                                image: `/images/avatars/${filename}`
                            }).then(el => {
                                return res.json({img: `/images/avatars/${filename}`})
                            })
                        }
                    })
            })
        } else {
            alert('Вы не добавили изображение')
            return false
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;