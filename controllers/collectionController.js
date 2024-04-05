const Collection = require('../models/collection');
const Album = require('../models/album');
const Sticker = require('../models/sticker');
const Progress = require('../models/progress');

// Lista todas as coleções do usuário logado (/collections -- método GET)
exports.getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.findAll({
            where: { user_id: req.user.id },
            include: Album
        });
        res.render('collections/collections', { collections });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }
};

// Renderiza a página de visualização de coleções (/collections/add -- método GET)
exports.renderAddCollectionPage = async (req, res) => {
    try {
        const albums = await Album.findAll();
        res.render('collections/collectionPage', { albums });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }    
};

// Cria o nova coleção (/collections/add/:id -- método POST)
exports.confirmAddCollection = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findByPk(albumId);
        if(!album) {
            return res.status(404).send('Álbum não encontrado');
        }
        res.render('collections/collectionForm', { album });        
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });     
    }
}

// Cria o nova coleção (/collections/add/:id -- método POST)
exports.addCollection = async (req, res) => {
    try {
        const { description, user_id, album_id } = req.body;

        // Cria a nova coleção
        const newCollection = await Collection.create({ description, user_id, album_id });

        // Armazena o id da nova coleção
        let collection_id = newCollection.id;
        
        // Valor de status inicial 
        let status = '';

        // Armazena todas a figurinhas do álbum ref. à coleção
        const stickers = await Sticker.findAll({where: {album_id}});
        stickers.forEach(async sticker => {
            let sticker_id = sticker.id;
            const newProgress = await Progress.create({ status, collection_id, sticker_id });
        });
               
        res.redirect('/collections');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }
}

// Renderiza o formulário de atualização de progresso da coleção (/collections/:id/edit -- método GET)
exports.renderUpdateCollectionProgressForm = async (req, res) => {
    try {
        const collectionId = req.params.id;
        const progress = await Progress.findAll({
            where: {collection_id: collectionId},
            include: Collection,
            include: Sticker
        });

        if(!progress) {
            return res.status(404).send('Coleção não encontrada');
        }

        const collection = await Collection.findByPk(
            collectionId,
            {include: Album}
        );

        if(!collection) {
            return res.status(404).send('Coleção não encontrada');
        }
        console.log(collection);
        res.render('progress/progressForm', { progress, collection });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }
}

// // Processar a atualização de progresso da coleção (/collections/:id -- método PUT)
exports.updateCollectionProgress = async (req, res) => {
    try {    
        let { id, status } = req.body;

        if (id.length !== status.length) {
            return res.status(404).send('Ocorreu algum erro na passagem de valores.');
        }

        const updates = id.map((id, index) => {
            return Progress.update({ status: status[index] }, { where: { id: id } })
        });

        await Promise.all(updates);

        res.redirect('/collections');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }
}

// Renderiza o formulário de exclusão de coleções (/collections/delete/:id -- método GET)
exports.renderDeleteCollectionForm = async (req, res) => {
    try {
        const collectionId = req.params.id;
        const deleteForm = true;
        const collection = await Collection.findByPk(collectionId);
        if(!collection) {
            return res.status(404).send('Coleção não encontrada');
        }
        res.render('collections/collectionForm', { collection, deleteForm });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }
}

// Processar a exclusão da coleção (/collections/:id -- método DELETE)
exports.deleteCollection = async (req, res) => {
    try {
        const collectionId = req.params.id;
        const collection = await Collection.findByPk(collectionId);
        if(!collection) {
            return res.status(404).send('Coleção não encontrada');
        }
        await collection.destroy();
        res.redirect('/collections');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }
}