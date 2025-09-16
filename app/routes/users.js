const express = require('express');
const router = express.Router();
const usersController = require(__basedir + '/app/controllers/usersController');

router.get('/', usersController.renderUsersPage);

router.post('/create', usersController.createUser);
router.patch('/update/:id', usersController.updateUser);
router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;
