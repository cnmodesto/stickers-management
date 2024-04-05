const db = require('./db/connection');
const Sequelize = require('sequelize');

const Usuario = require('./models/Usuario');
const Album = require('./models/Album');
const Figurinha = require('./models/Figurinha');
const Colecao = require('./models/Colecao');
const AndamentoColecao = require('./models/Andamento');

db.sync({ force: true }) // Use { force: true } apenas para ambiente de teste
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
  });