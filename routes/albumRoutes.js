const express = require('express');
const albumController = require('../controllers/albumController');
const ensureAuthenticated = require('../middlewares/authMiddleware');
const setUserInLocals = require('../middlewares/setUserInLocalMiddleware');

const router = express.Router();

router.use(setUserInLocals);

router.get('/albums', ensureAuthenticated, albumController.getAllAlbums);
router.get('/albums/add', ensureAuthenticated, albumController.renderAddAlbumForm);
router.post('/albums/add', ensureAuthenticated, albumController.createAlbum);
router.get('/albums/:id/edit', ensureAuthenticated, albumController.renderUpdateAlbumForm);
router.put('/albums/:id', ensureAuthenticated, albumController.updateAlbum);
router.get('/albums/:id/delete', ensureAuthenticated, albumController.renderDeleteAlbumForm);
router.delete('/albums/:id', ensureAuthenticated, albumController.deleteAlbum);

module.exports = router;