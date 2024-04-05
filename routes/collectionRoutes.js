const express = require('express');
const collectionController = require('../controllers/collectionController');
const ensureAuthenticated = require('../middlewares/authMiddleware');
const setUserInLocals = require('../middlewares/setUserInLocalMiddleware');

const router = express.Router();

router.use(setUserInLocals);

router.get('/collections', ensureAuthenticated, collectionController.getAllCollections);
router.get('/collections/add', ensureAuthenticated, collectionController.renderAddCollectionPage);
router.get('/collections/add/:id/confirm', ensureAuthenticated, collectionController.confirmAddCollection);
router.post('/collections/add', ensureAuthenticated, collectionController.addCollection);
router.get('/collections/:id/edit', ensureAuthenticated, collectionController.renderUpdateCollectionProgressForm);
router.put('/collections/:id', ensureAuthenticated, collectionController.updateCollectionProgress);
router.get('/collections/:id/delete', ensureAuthenticated, collectionController.renderDeleteCollectionForm);
router.delete('/collections/:id', ensureAuthenticated, collectionController.deleteCollection);

module.exports = router;