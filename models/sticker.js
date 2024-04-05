const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Album = require('./album')

const Sticker = sequelize.define('Sticker', {
    prefix: {
        type: DataTypes.STRING,
    },
    number: {
        type: DataTypes.INTEGER,
    }
});

Album.hasMany(Sticker, { foreignKey: 'album_id', onDelete: 'cascade', onUpdate: 'cascade' });
Sticker.belongsTo(Album, { foreignKey: 'album_id' });

module.exports = Sticker;