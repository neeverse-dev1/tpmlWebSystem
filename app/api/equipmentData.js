const express = require('express');
const router = express.Router();
const equipmentDataController = require(__basedir + '/app/controllers/equipmentDataController');

router.post('/data', equipmentDataController.receiveData);

module.exports = router;

