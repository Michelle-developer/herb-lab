const fs = require('fs');

const folders = JSON.parse(
  fs.readFileSync(`${__dirname}/../public/data/foldersData.json`, 'utf-8')
);

exports.checkID = (req, res, next, val) => {
  console.log(`Folder ID is ${val}`);
  if (req.params.id * 1 > folders.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(404).json({
      status: 'fail',
      message: '無法創建未命名資料夾',
    });
  }
  next();
};

exports.getAllFolders = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: folders.length,
    data: {
      folders,
    },
  });
};

exports.getFolder = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const folder = folders.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      folder,
    },
  });
};

exports.createFolder = (req, res) => {
  console.log(req.body);
  const newId = folders[folders.length - 1].id + 1;
  const newFolder = Object.assign({ id: newId }, req.body);

  folders.push(newFolder);
  fs.writeFile(`${__dirname}/public/data/foldersData.json`, JSON.stringify(folders), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        folder: newFolder,
      },
    });
  });
};
