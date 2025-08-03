const Folder = require('../models/folderModel');

exports.getDemoFolders = async (req, res) => {
  try {
    const folders = await Folder.find({
      isPublic: true,
      source: 'system',
    })
      .populate('items.herbId')
      .lean();

    // 過濾掉私人資料夾、中藥卡片，只顯示來自系統的資料
    const filteredFolders = folders
      .filter((folder) => folder.isProtected)
      .map(({ items, ...rest }) => ({
        ...rest,
        items: items.filter((item) => item.isProtected),
      }));

    res.status(200).json({
      status: 'success',
      requestAt: req.requestTime,
      results: folders.length,
      data: {
        filteredFolders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
