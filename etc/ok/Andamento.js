const Sequelize = require('sequelize');
const db = require('../db/connection');
const { DataTypes } = require('sequelize');
const Figurinha = require('./Figurinha');
const Colecao = require('./Colecao');

const AndamentoColecao = db.define('andamento_colecao', {
    status: {
        type: DataTypes.ENUM('faltando', 'colada'),
    }
});

Colecao.hasMany(AndamentoColecao, { foreignKey: 'id_colecao' });
AndamentoColecao.belongsTo(Colecao, { foreignKey: 'id_colecao' });

Figurinha.hasMany(AndamentoColecao, { foreignKey: 'id_figurinha' });
AndamentoColecao.belongsTo(Figurinha, { foreignKey: 'id_figurinha' });

module.exports = AndamentoColecao;