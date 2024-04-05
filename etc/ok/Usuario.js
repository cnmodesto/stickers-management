const Sequelize = require('sequelize');
const db = require('../db/connection');
const { DataTypes } = require('sequelize');

const User = db.define('user', {
    user: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    }
});

module.exports = User;