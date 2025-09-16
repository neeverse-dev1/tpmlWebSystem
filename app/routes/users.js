const express = require('express');
const router = express.Router();
const usersController = require(__basedir + '/app/controllers/usersController');

router.get('/', usersController.renderEquipmentPage);

router.post('/create', usersController.createEquipment);
router.patch('/update/:id', usersController.updateEquipment);
router.delete('/delete/:id', usersController.deleteEquipment);

module.exports = router;
