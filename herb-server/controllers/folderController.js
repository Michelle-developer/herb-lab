const mongoose = require('mongoose');
const Folder = require('../models/folderModel');

exports.getAllFolders = async (req, res) => {
  let query = {};

  // 未登入
  if (!req.user) {
    query = {
      isPublic: true,
      source: 'system',
    };
  }

  // 體驗帳號登入
  else if (req.isGuest) {
    query = {
      $or: [{ isPublic: true, source: 'system' }, { owner: req.user._id }],
    };
  }

  try {
    const folders = await Folder.find(query).populate('items.herbId');

    res.status(200).json({
      status: 'success',
      requestAt: req.requestTime,
      results: folders.length,
      data: {
        folders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id).populate('items.herbId');

    res.status(200).json({
      status: 'success',
      data: {
        folder,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createFolder = async (req, res) => {
  try {
    const newFolder = await Folder.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        folder: newFolder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateFolder = async (req, res) => {
  try {
    const folder = await Folder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        folder,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        folder,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addItemToFolder = async (req, res) => {
  const folderId = req.params.id;
  const herbId = req.body.id;
  try {
    const folder = await Folder.findById(folderId);

    if (!folder) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到資料夾ID',
      });
    }

    // 檢查 herbId 是否已存在於此資料夾的 items 陣列中
    const isAlreadyInFolder = folder.items.some(
      (item) => item.herbId.toString() === herbId.toString()
    );

    // 如果該中藥已存在，回傳錯誤，避免重複加入
    if (isAlreadyInFolder) {
      return res.status(409).json({
        status: 'fail',
        message: '此中藥已經在資料夾中',
      });
    }

    folder.items.push({
      herbId: new mongoose.Types.ObjectId(herbId),
      isProtected: false,
      addedAt: new Date(),
    });

    await folder.save();

    await folder.populate('items.herbId');

    res.status(200).json({
      status: 'success',
      data: folder,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: '系統發生錯誤，中藥儲存失敗',
      error: err.message,
    });
  }
};

exports.moveItemBetweenFolders = async (req, res) => {
  const fromFolderId = req.params.fromFolderId;
  const toFolderId = req.params.toFolderId;
  const herbId = req.body.id;

  try {
    const origin = await Folder.findById(fromFolderId);
    const target = await Folder.findById(toFolderId).populate('items.herbId');
    const isInOriginFolder = origin.items.some((item) => item.herbId.toString() === herbId);
    const isInTargetFolder = target.items.some((item) => item.herbId.toString() === herbId);

    if (!origin || !target) {
      return res.status(400).json({
        status: 'fail',
        message: '找不到指定的資料夾',
      });
    }

    if (!isInOriginFolder) {
      return res.status(400).json({
        status: 'fail',
        message: '原資料夾中已無此中藥，無法移動',
      });
    }

    origin.items = origin.items.filter((item) => item.herbId.toString() !== herbId);

    if (!isInTargetFolder) {
      target.items.push({
        herbId: new mongoose.Types.ObjectId(herbId),
        isProtected: false,
        addedAt: new Date(),
      });
    }

    await origin.save();
    await target.save();

    res.status(200).json({
      status: 'success',
      data: {
        from: origin,
        to: target,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: '系統發生錯誤，中藥移動失敗',
      error: err.message,
    });
  }
};

exports.removeItemFromFolder = async (req, res) => {
  const folderId = req.params.id;
  const herbId = req.body.id;
  try {
    const folder = await Folder.findById(folderId);
    const isInFolder = folder.items.some((item) => item.herbId.toString() === herbId);

    if (!folder) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到資料夾ID',
      });
    }

    // 檢查該中藥是否還在資料夾中：避免使用者重複點擊刪除，或資料同步發生問題
    if (!isInFolder) {
      return res.status(400).json({
        status: 'fail',
        message: '該中藥已不在當前資料夾中，無法移除',
      });
    }

    if (folder.items.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: '當前資料夾已無任何中藥可移除',
      });
    }

    folder.items = folder.items.filter((item) => item.herbId.toString() !== herbId);

    await folder.save();

    res.status(200).json({
      status: 'success',
      data: {
        folder,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: '系統發生錯誤，中藥移除失敗',
      error: err.message,
    });
  }
};
