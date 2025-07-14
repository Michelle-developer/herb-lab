const express = require('express');
const folderController = require('../controllers/folderController');
//TODO: userController
const router = express.Router();

router.param('id', folderController.checkID);

router
  .route('/')
  .get(folderController.getAllFolders)
  .post(folderController.checkBody, folderController.createFolder);
router.route('/:id').get(folderController.getFolder);

module.exports = router;
