const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Album = require('./album')

const Collection = sequelize.define('Collection', {
    description: {
        type: DataTypes.STRING,
    }
});

User.hasMany(Collection, { foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });
Collection.belongsTo(User, { foreignKey: 'user_id' });

Album.hasMany(Collection, { foreignKey: 'album_id', onDelete: 'cascade', onUpdate: 'cascade' });
Collection.belongsTo(Album, { foreignKey: 'album_id' });

module.exports = Collection;