const express = require('express');
const reportController = require('../controllers/reportController');
const ensureAuthenticated = require('../middlewares/authMiddleware');
const setUserInLocals = require('../middlewares/setUserInLocalMiddleware');

const router = express.Router();

router.use(setUserInLocals);

router.get('/reports', ensureAuthenticated, reportController.getReportsPage);

module.exports = router;