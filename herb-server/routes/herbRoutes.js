const express = require('express');
const router = express.Router();
const herbController = require('../controllers/herbController');

router.route('/').get(herbController.getAllHerbs);
router.route('/:id').get(herbController.getHerb);

module.exports = router;
