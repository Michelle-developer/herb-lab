const Herb = require('../models/herbModel');

exports.getAllHerbs = async (req, res) => {
  try {
    const herbs = await Herb.find();

    res.status(200).json({
      status: 'success',
      results: herbs.length,
      data: {
        herbs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getHerb = async (req, res) => {
  try {
    const herb = await Herb.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        herb,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
