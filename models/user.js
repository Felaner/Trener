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
    resetToken: {
        type: Sequelize.STRING
    }
})

module.exports = user