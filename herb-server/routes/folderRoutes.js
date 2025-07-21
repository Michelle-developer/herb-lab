const express = require('express');
const folderController = require('../controllers/folderController');
const router = express.Router();
const authController = require('../controllers/authController');

router
  .route('/')
  .get(folderController.getAllFolders)
  .post(authController.protect, folderController.createFolder);

router
  .route('/:id')
  .get(folderController.getFolder)
  .patch(authController.protect, folderController.updateFolder)
  .delete(authController.protect, folderController.deleteFolder);

// 新增（儲存）中藥卡片到資料夾
router.route('/:id/add-item').post(authController.protect, folderController.addItemToFolder);

// 將中藥卡片從原資料 (from) 夾移動到其他資料夾 (to)
router
  .route('/:fromFolderId/move-item/:toFolderId')
  .patch(authController.protect, folderController.moveItemBetweenFolders);

// 將中藥卡片從資料夾中移除
router
  .route('/:id/remove-item')
  .patch(authController.protect, folderController.removeItemFromFolder);

module.exports = router;
