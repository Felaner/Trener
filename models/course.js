const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

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

module.exports = course