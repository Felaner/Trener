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
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    courseId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey : true
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
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey : true
    }
})

user.hasOne(character, {foreignKey : 'userId'});

const course = sequelize.define('Course', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    description: {
        allowNull: false,
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING
    }
})

course.hasOne(user, {foreignKey : 'courseId'});

const video = sequelize.define('Video', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    courseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey : true
    }
})

course.hasMany(video, {foreignKey: 'courseId'})

module.exports = { user, character, course, video }