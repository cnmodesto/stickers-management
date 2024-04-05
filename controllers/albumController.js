const Album = require('../models/album');
const Sticker = require('../models/sticker');
const { Op } = require('sequelize');

// Lista todos os álbuns (/albums -- método GET)
exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.findAll();
        res.render('albums/albums', { albums });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }
};

// Renderiza o formulário de criação de novos álbuns (/albums/add -- método GET)
exports.renderAddAlbumForm = (req, res) => {
    const createForm = true;
    res.render('albums/albumForm', { createForm });
}

// Cria o novo álbum (/albums/add -- método POST)
exports.createAlbum = async (req, res) => {
    try {
        const { name, editor, description, category, year, country, ordercode, imageurl } = req.body;
        // Verifica se o nome já existe na base de dados
        const existingAlbum = await Album.findOne({ where: { name } });
        if (existingAlbum) {
            return res.status(400).send('Álbum com este nome já existe');
        }
        // Cria o novo álbum
        const newAlbum = await Album.create({ name, editor, description, category, year, country, ordercode, imageurl });

        // Armazena o id do novo álbum
        let album_id = newAlbum.id;

        // Adiciona stickers
        if(req.body['prefix'] instanceof Array){
            for (let i = 0; i < req.body['prefix'].length; i++) {
                for (let key in req.body) {
                    if(key.match('prefix')) {
                        prefix = req.body[key][i];
                    }
                    if(key.match('sticker_number_start')) {
                        initial_sticker = req.body[key][i];
                    }
                    if(key.match('sticker_number_end')) {
                        final_sticker = req.body[key][i];
                    }
                }
                for (let i = initial_sticker; i <= final_sticker; i++) {
                    number = String(i);
                    const newSticker = await Sticker.create({ prefix, number, album_id });
                }
            }
        } else {
            prefix = req.body['prefix'];
            initial_sticker = req.body['sticker_number_start'];
            final_sticker = req.body['sticker_number_end'];
            for (let i = initial_sticker; i <= final_sticker; i++) {
                number = String(i);
                const newSticker = await Sticker.create({ prefix, number, album_id });
            }            
        }
            
        // Redireciona para a página principal dos álbuns
        res.redirect('/albums');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });    
    }
}

// Renderiza o formulário de atualização de álbum (/albums/edit/:id -- método GET)
exports.renderUpdateAlbumForm = async (req, res) => {
    try {
        const albumId = req.params.id;
        const updateForm = true;
        const album = await Album.findByPk(albumId);
        if(!album) {
            return res.status(404).send('Álbum não encontrado');
        }

        // Retorna prefixos para álbum
        const stickersPrefix = await Sticker.findAll({ 
            where: { album_id: albumId },
            attributes: ['prefix'], 
            group: ['prefix'],
            order: ['id']
        });

        let stickers = {};

        for (let i = 0; i < stickersPrefix.length; i++) {
            const stickersNumbers = await Sticker.count({
                where: { 
                    prefix: stickersPrefix[i].prefix,
                    album_id: albumId
                }
            });
            stickers['prefix_' + (i + 1)] = {
                prefix: stickersPrefix[i].prefix, 
                sticker_number_start: 1, 
                sticker_number_end: stickersNumbers
            };
        }
        res.render('albums/albumForm', { album, stickers, updateForm });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });    
    }
}

// Processar a atualização do álbum (/albums/:id -- método PUT)
exports.updateAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const { name, editor, description, category, year, country, ordercode, imageurl } = req.body;
        const album = await Album.findByPk(albumId);
        if(!album) {
            return res.status(404).send('Álbum não encontrado');
        }
        await album.update({ name, editor, category, description, year, country, ordercode, imageurl });

        // Atualiza stickers
        for (let i = 0; i < req.body['prefix'].length; i++) {
            // Itera sobre os valores recebidos via body
            for (let key in req.body) {
                if(key.match('prefix')) {
                    prefix = req.body[key][i];
                }
                if(key.match('sticker_number_start')) {
                    initial_sticker = req.body[key][i];
                }
                if(key.match('sticker_number_end')) {
                    final_sticker = req.body[key][i];
                }
            }

            // Recupera o maior número relacionado a determinado prefixo
            const maxNumberByPrefix = await Sticker.max('number', {
                where: {
                    album_id: albumId,
                    prefix
                }
            });
            // Se o maior número relacionado a determinado prefixo for menor que o campo final_sticker passado via body
            // Efetua adição dos números faltantes para o prefixo
            if(maxNumberByPrefix < final_sticker) {
                for(let i = (maxNumberByPrefix + 1); i <= final_sticker; i++) {
                    let number = i;
                    await Sticker.create({ prefix, number, album_id: albumId })
                }
            }
            // Se o maior número relacionado a determinado prefixo for maior que o campo final_sticker passado via body
            // Efetua remoção dos números que sobram para o prefixo
            if(maxNumberByPrefix > final_sticker) {
                for(let i = maxNumberByPrefix; i > final_sticker; i--) {
                    let number = i;
                    await Sticker.destroy({ where: 
                        { prefix, number, album_id: albumId }
                    });
                }
            }

            // Faz nova verifição de existência do registro. Caso não exista, efetua adição
            // Deve pegar casos de novos prefixos
            for (let i = initial_sticker; i <= final_sticker; i++) {
                number = String(i);

                const existingSticker = await Sticker.findOne({
                    where: {
                        album_id: albumId,
                        prefix,
                        number
                    }
                })

                if(!existingSticker) {
                    await Sticker.create({ prefix, number, album_id: albumId })
                }
            }            
        }        
        // Remove stickers caso prefixo tenha sido removido via formulário
        const prefixosRecebidos = req.body['prefix']
        await Sticker.destroy({
            where: {
                prefix: { 
                    [Op.notIn]: [prefixosRecebidos]
                },
                album_id: albumId
            }
        })

        res.redirect('/albums');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });     
    }
}

// Renderiza o formulário de exclusão de álbuns (/albums/delete/:id -- método GET)
exports.renderDeleteAlbumForm = async (req, res) => {
    try {
        const albumId = req.params.id;
        const deleteForm = true;
        const album = await Album.findByPk(albumId);
        if(!album) {
            return res.status(404).send('Álbum não encontrado');
        }

        // Retorna prefixos para álbum
        const stickersPrefix = await Sticker.findAll({ 
            where: { album_id: albumId },
            attributes: ['prefix'], 
            group: ['prefix'],
            order: ['id']
        });

        let stickers = {};

        for (let i = 0; i < stickersPrefix.length; i++) {
            const stickersNumbers = await Sticker.count({
                where: { 
                    prefix: stickersPrefix[i].prefix,
                    album_id: albumId
                }
            });
            stickers['prefix_' + (i + 1)] = {
                prefix: stickersPrefix[i].prefix, 
                sticker_number_start: 1, 
                sticker_number_end: stickersNumbers
            };
        }
        res.render('albums/albumForm', { album, stickers, deleteForm });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });  
    }
}

// Processar a exclusão do álbum (/collections/:id -- método DELETE)
exports.deleteAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findByPk(albumId);
        if(!album) {
            return res.status(404).send('Álbum não encontrado');
        }
        await album.destroy();
        res.redirect('/albums');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });     
    }
}

