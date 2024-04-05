const express = require('express');
const userController = require('../controllers/userController');
const ensureAuthenticated = require('../middlewares/authMiddleware');
const setUserInLocals = require('../middlewares/setUserInLocalMiddleware');

const router = express.Router();

router.use(setUserInLocals);

router.get('/users', ensureAuthenticated, userController.getAllUsers);
router.get('/users/add', ensureAuthenticated, userController.renderAddUserForm);
router.post('/users/add', ensureAuthenticated, userController.createUser);
router.get('/users/:id/edit', ensureAuthenticated, userController.renderUpdateUserForm);
router.put('/users/:id', ensureAuthenticated, userController.updateUser);
router.get('/users/:id/delete', ensureAuthenticated, userController.renderDeleteUserForm);
router.delete('/users/:id', ensureAuthenticated, userController.deleteUser);

router.post('/register', userController.registerUser);
router.get('/register', userController.renderRegisterUserForm);

module.exports = router;