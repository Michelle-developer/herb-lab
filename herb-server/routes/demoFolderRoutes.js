const express = require('express');
const demoFolderController = require('../controllers/demoFolderController');
const router = express.Router();

router.route('/').get(demoFolderController.getDemoFolders);

module.exports = router;
