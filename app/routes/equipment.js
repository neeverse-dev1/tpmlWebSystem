const express = require('express');
const router = express.Router();
const equipmentController = require(__basedir + '/app/controllers/equipmentController');

router.get('/', equipmentController.renderEquipmentPage);

module.exports = router;
