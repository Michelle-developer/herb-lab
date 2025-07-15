const express = require('express');
const folderController = require('../controllers/folderController');
const router = express.Router();

router.route('/').get(folderController.getAllFolders).post(folderController.createFolder);

router
  .route('/:id')
  .get(folderController.getFolder)
  .patch(folderController.updateFolder)
  .delete(folderController.deleteFolder);

// 新增（儲存）中藥卡片到資料夾
router.route('/:id/add-item').post(folderController.addItemToFolder);

// 將中藥卡片從原資料 (from) 夾移動到其他資料夾 (to)
router.route('/:fromFolderId/move-item/:toFolderId').patch(folderController.moveItemBetweenFolders);

// 將中藥卡片從資料夾中移除
router.route('/:id/remove-item').patch(folderController.removeItemFromFolder);

module.exports = router;
