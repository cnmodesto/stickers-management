const Sequelize = require('sequelize');
const db = require('../db/connection');
const { DataTypes } = require('sequelize');
const Usuario = require('./Usuario');
const Album = require('./Album');

const Colecao = db.define('colecao', {});

Usuario.hasMany(Colecao, { foreignKey: 'id_usuario' });
Colecao.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Album.hasMany(Colecao, { foreignKey: 'id_album' });
Colecao.belongsTo(Album, { foreignKey: 'id_album' });

module.exports = Colecao;