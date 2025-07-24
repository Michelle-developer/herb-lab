const express = require('express');
const router = express.Router();
const herbController = require('../controllers/herbController');
const authController = require('../controllers/authController');

router.route('/').get(authController.protect, herbController.getAllHerbs);
router.route('/:id').get(herbController.getHerb);

module.exports = router;
