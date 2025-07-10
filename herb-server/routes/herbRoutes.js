const express = require('express');
const herbController = require('../controllers/herbController');

const router = express.Router();

router.route('/').get(herbController.getAllHerbs);
router.route('/:slug').get(herbController.getHerb);

module.exports = router;
