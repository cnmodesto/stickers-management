const Sequelize = require('sequelize');
const db = require('../db/connection');
const { DataTypes } = require('sequelize');
const Album = require('./Album')

const Figurinha = db.define('figurinha', {
    prefixo: {
        type: DataTypes.STRING,
    },
    numero: {
        type: DataTypes.STRING,
    },
    imagem: {
        type: DataTypes.STRING,
    }
});

Album.hasMany(Figurinha, { foreignKey: 'id_album' });
Figurinha.belongsTo(Album, { foreignKey: 'id_album' });


module.exports = Figurinha;