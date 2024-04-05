const db = require('./db/connection');
const Sequelize = require('sequelize');

const Usuario = require('./models/Usuario');
const Album = require('./models/Album');
const Figurinha = require('./models/Figurinha');
const Colecao = require('./models/Colecao');
const AndamentoColecao = require('./models/Andamento');

// Exemplo de teste de criação de um usuário
Usuario.create({ 
    usuario: 'joao', 
    email: 'joao@example.com', 
    password: 'senha123' 
})
.then((usuario) => {
  console.log('Usuário criado:', usuario.toJSON());
})
.catch((err) => {
  console.error('Erro ao criar usuário:', err);
});

// Exemplo de teste de criação de um álbum
Album.create({ 
    nome: 'Copa América USA 2024', 
    editora: 'Panini',
    descricao: 'Copa América USA 2024',
    ano: '2024',
    pais: 'Brasil',
    codigo_pedido: '004808ABRP99',
    imagem: ''
})
.then((album) => {
  console.log('Álbum criado:', album.toJSON());
})
.catch((err) => {
  console.error('Erro ao criar álbum:', err);
});

// Exemplo de teste de criação de figurinhas
const intr = 'INTR', hci = 'HCI', leg = 'LEG', roh = 'ROH'; 

const arrayPrefixosSelecoes = [
    'ARG',
    'PER',
    'CHI',
    'MEX',
    'ECU',
    'VEN',
    'JAM',
    'USA',
    'URU',
    'PAN',
    'BOL',
    'BRA',
    'COL',
    'PAR',
    'CAN',
    'CRC',
    'HON',
    'TRI',
]

// INTR
for (let j = 1; j <= 4; j++) {
        Figurinha.create({ 
            prefixo: intr, 
            numero: j,
            imagem: '',
            id_album: 1
        })
        .then((figurinha) => {
          console.log('Figurinha criada:', figurinha.toJSON());
        })
        .catch((err) => {
          console.error('Erro ao criar álbum:', err);
        });                
} 

// HCI
for (let j = 1; j <= 10; j++) {
    Figurinha.create({ 
        prefixo: hci, 
        numero: j,
        imagem: '',
        id_album: 1
    })
    .then((figurinha) => {
      console.log('Figurinha criada:', figurinha.toJSON());
    })
    .catch((err) => {
      console.error('Erro ao criar álbum:', err);
    });                
} 

// Selecoes
for (let i = 0; i < arrayPrefixosSelecoes.length; i++) {
    for (let j = 1; j <= 22; j++) {
        Figurinha.create({ 
            prefixo: arrayPrefixosSelecoes[i], 
            numero: j,
            imagem: '',
            id_album: 1
        })
        .then((figurinha) => {
          console.log('Figurinha criada:', figurinha.toJSON());
        })
        .catch((err) => {
          console.error('Erro ao criar álbum:', err);
        });                
    } 
}

// LEG
for (let j = 1; j <= 18; j++) {
    Figurinha.create({ 
        prefixo: leg, 
        numero: j,
        imagem: '',
        id_album: 1
    })
    .then((figurinha) => {
      console.log('Figurinha criada:', figurinha.toJSON());
    })
    .catch((err) => {
      console.error('Erro ao criar álbum:', err);
    });                
} 

// ROH
for (let j = 1; j <= 2; j++) {
    Figurinha.create({ 
        prefixo: roh, 
        numero: j,
        imagem: '',
        id_album: 1
    })
    .then((figurinha) => {
      console.log('Figurinha criada:', figurinha.toJSON());
    })
    .catch((err) => {
      console.error('Erro ao criar álbum:', err);
    });                
} 

// Exemplo de teste de criação de uma coleção
Colecao.create({ 
    id_usuario: 1,
    id_album: 1
})
.then((usuario) => {
  console.log('Coleção criada:', usuario.toJSON());
})
.catch((err) => {
  console.error('Erro ao criar coleção:', err);
});

// Exemplo de teste de criação de andamento de uma coleção
for (let j = 1; j <= 430; j++) {
    AndamentoColecao.create({ 
        status: 'faltante', 
        id_colecao: 1,
        id_figurinha: j
    })
    .then((andamento) => {
      console.log('Andamento criado:', andamento.toJSON());
    })
    .catch((err) => {
      console.error('Erro ao criar álbum:', err);
    });                
} 
