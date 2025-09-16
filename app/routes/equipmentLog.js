const express = require('express');
const router = express.Router();
const equipmentLogController = require(__basedir + '/app/controllers/equipmentLogController');

router.get('/', equipmentLogController.renderLogPage);

module.exports = router;