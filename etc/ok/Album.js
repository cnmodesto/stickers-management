const Sequelize = require('sequelize');
const db = require('../db/connection');
const { DataTypes } = require('sequelize');

const Album = db.define('album', {
    nome: {
        type: DataTypes.STRING,
    },
    editora: {
        type: DataTypes.STRING,
    },
    descricao: {
        type: DataTypes.STRING,
    }, 
    ano: {
        type: DataTypes.STRING,
    },
    pais: {
        type: DataTypes.STRING,
    },
    codigo_pedido: {
        type: DataTypes.STRING,
    },
    imagem: {
        type: DataTypes.STRING,
    }
});

module.exports = Album;