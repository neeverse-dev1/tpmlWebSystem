const express = require('express');
const router = express.Router();
const indexController = require(__basedir + '/app/controllers/indexController');

router.get('/', indexController.renderIndexPage);

module.exports = router;
