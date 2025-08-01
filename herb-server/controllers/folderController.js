const mongoose = require('mongoose');
const Folder = require('../models/folderModel');

exports.getAllFolders = async (req, res) => {
  let query = {};

  // 體驗帳號登入
  if (req.isGuest) {
    query = {
      $or: [{ isPublic: true, source: 'system' }, { owner: req.user._id }],
    };
  }

  // 未來正式帳號登入（帶入系統預設，因為暫存區資料夾是必須的）
  else {
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
      message: err.message,
    });
  }
};

exports.getFolder = async (req, res) => {
  let query = { _id: req.params.id };

  // 體驗帳號登入
  if (req.isGuest) {
    query.$or = [
      { isPublic: true, source: 'system', _id: req.params.id },
      { owner: req.user._id, _id: req.params.id },
    ];
  }

  // 未來正式帳號登入
  else {
    query.$or = [
      { isPublic: true, source: 'system', _id: req.params.id },
      { owner: req.user._id, _id: req.params.id },
    ];
  }

  try {
    const folder = await Folder.findOne(query).populate('items.herbId');

    if (!folder) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到此資料夾，或無存取權限',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        folder,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.createFolder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({
        status: 'fail',
        message: '請先登入帳號，才能使用此功能',
      });
    }
    // 強制綁定 owner，避免前端傳送偽造資料
    const newFolder = await Folder.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({
      status: 'success',
      data: {
        folder: newFolder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateFolder = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      status: 'fail',
      message: '請先登入帳號，才能使用此功能',
    });
  }

  // 查詢條件：只能修改自己、且非保護資料夾
  const query = {
    _id: req.params.id,
    owner: req.user._id,
    isProtected: false,
  };

  try {
    const folder = await Folder.findOneAndUpdate(
      query,
      { name: req.body.name },
      { new: true, runValidators: true }
    );

    if (!folder) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到此資料夾，或無修改權限',
      });
    }

    await folder.save();
    await folder.populate('items.herbId');

    res.status(200).json({
      status: 'success',
      data: {
        folder,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteFolder = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      status: 'fail',
      message: '請先登入帳號，才能使用此功能',
    });
  }

  // 查詢條件：只能刪除自己、且非保護資料夾
  const query = {
    _id: req.params.id,
    owner: req.user._id,
    isProtected: false,
  };

  try {
    const folder = await Folder.findOneAndDelete(query);

    if (!folder) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到此資料夾，或無刪除權限',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        folder,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.addItemToFolder = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      status: 'fail',
      message: '請先登入帳號，才能使用此功能',
    });
  }

  const query = {
    name: '暫存區',
    owner: req.user._id,
  };
  const herbId = req.body.id;
  try {
    const folder = await Folder.findOne(query);

    if (!folder) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到暫存區資料夾，請確認此帳號有預設資料夾',
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
      data: {
        folder,
      },
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
  if (!req.user) {
    return res.status(403).json({
      status: 'fail',
      message: '請先登入帳號，才能使用此功能',
    });
  }

  const herbId = req.body.id;

  // 查詢條件：只能操作自己、且非保護資料夾
  const fromFolderQuery = {
    _id: req.params.fromFolderId,
    owner: req.user._id,
  };
  const toFolderQuery = {
    _id: req.params.toFolderId,
    owner: req.user._id,
  };

  try {
    const origin = await Folder.findOne(fromFolderQuery);
    const target = await Folder.findOne(toFolderQuery);

    if (!origin || !target) {
      return res.status(400).json({
        status: 'fail',
        message: '找不到來源或目標資料夾，或無操作權限',
      });
    }

    const protectedItem = origin.items.find(
      (item) => item.herbId.toString() == herbId && item.isProtected === true
    );
    if (protectedItem) {
      return res.status(403).json({
        status: 'fail',
        message: '此中藥為系統預設資料，請勿移動',
      });
    }

    const isInOriginFolder = origin.items.some((item) => item.herbId.toString() === herbId);
    const isInTargetFolder = target.items.some((item) => item.herbId.toString() === herbId);

    if (!isInOriginFolder) {
      return res.status(400).json({
        status: 'fail',
        message: '來源資料夾中已無此中藥，無法移動',
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

    await origin.populate('items.herbId');
    await target.populate('items.herbId');

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
  if (!req.user) {
    return res.status(403).json({
      status: 'fail',
      message: '請先登入帳號，才能使用此功能',
    });
  }

  const folderQuery = {
    _id: req.params.id,
    owner: req.user._id,
  };

  const herbId = req.body.id;

  try {
    const folder = await Folder.findOne(folderQuery);

    if (!folder) {
      return res.status(404).json({
        status: 'fail',
        message: '找不到資料夾，或無刪除此中藥權限',
      });
    }

    const isInFolder = folder.items.some((item) => item.herbId.toString() === herbId);

    // 檢查該中藥是否還在資料夾中：避免使用者重複點擊刪除，或資料同步發生問題
    if (!isInFolder) {
      return res.status(400).json({
        status: 'fail',
        message: '該中藥已不在當前資料夾中，無法移除',
      });
    }

    const protectedItem = folder.items.find(
      (item) => item.herbId.toString() == herbId && item.isProtected === true
    );

    if (protectedItem) {
      return res.status(403).json({
        status: 'fail',
        message: '此中藥為系統預設資料，請勿刪除',
      });
    }

    folder.items = folder.items.filter((item) => item.herbId.toString() !== herbId);

    await folder.save();

    await folder.populate('items.herbId');

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
