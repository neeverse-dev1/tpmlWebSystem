const express = require('express');
const router = express.Router();
const equipmentController = require(__basedir + '/app/controllers/equipmentController');

router.get('/', equipmentController.renderEquipmentPage);

router.post('/create', equipmentController.createEquipment);
router.patch('/update/:id', equipmentController.updateEquipment);
router.delete('/delete/:id', equipmentController.deleteEquipment);

module.exports = router;
