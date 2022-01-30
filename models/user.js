const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const user = sequelize.define('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    secondName: {
        allowNull: false,
        type: Sequelize.STRING
    },
    course: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resetToken: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
})

const character = sequelize.define('Character', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    growth: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    weight: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    bust: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    waist: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    girth: {
        allowNull: true,
        type: Sequelize.INTEGER
    },
    image: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: '/images/avatars/chooseImage.png'
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey : true
    }
})

user.hasOne(character, {foreignKey : 'userId'});

module.exports = { user, character }