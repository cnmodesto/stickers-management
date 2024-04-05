const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Album = sequelize.define('Album', {
    name: {
        type: DataTypes.STRING,
    },
    editor: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.STRING,
    },
    year: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    ordercode: {
        type: DataTypes.STRING,
    },
    imageurl: {
        type: DataTypes.STRING,
    }
});

module.exports = Album;