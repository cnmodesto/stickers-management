const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const Collection = require('./collection');
const Sticker = require('./sticker')

const Progress = sequelize.define('Progress', {
    status: {
        type: DataTypes.STRING,
    }
});

Collection.hasMany(Progress, {
    foreignKey: 'collection_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Progress.belongsTo(Collection, {
    foreignKey: 'collection_id'
});

Sticker.hasMany(Progress, {
    foreignKey: 'sticker_id',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Progress.belongsTo(Sticker, {
    foreignKey: 'sticker_id'
});

Sticker.afterCreate(async (stickerInstance, options) => {
    // Recupera todas as coleções relacionadas ao álbum
    const collectionsByAlbumId = await Collection.findAll({
        where: {
            album_id: stickerInstance.album_id
        }
    })

    // Itera pelo id das coleções para criar os novos registros de stickers para cada coleção em progresso
    for(let i = 0; i < collectionsByAlbumId.length; i++){
        let collectionId = collectionsByAlbumId[i].id;
        // Cria um novo registro na tabela filho quando um novo registro é criado na tabela pai
        await Progress.create({
            // Defina os valores dos campos da tabela filho com base nos valores da tabela pai
            status: '',
            collection_id: collectionId,
            sticker_id: stickerInstance.id
        }, {
            transaction: options.transaction
        });
    }
});

module.exports = Progress;