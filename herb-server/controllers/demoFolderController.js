const Folder = require('../models/folderModel');

exports.getDemoFolders = async (req, res) => {
  try {
    const folders = await Folder.find({
      isPublic: true,
      source: 'system',
    })
      .populate('items.herbId')
      .lean();

    // 過濾掉私人收藏的中藥卡片，只顯示系統預設的
    const filteredFolders = folders.map((folder) => {
      const filteredItems = folder.items.filter((item) => item.isProtected === true);
      return {
        ...folder,
        items: filteredItems,
      };
    });

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
