const express = require('express');
const router = express.Router();
const usersLogController = require(__basedir + '/app/controllers/usersLogController');

router.get('/', usersLogController.renderLogPage);

module.exports = router;