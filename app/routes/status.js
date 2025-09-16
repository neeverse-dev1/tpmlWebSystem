const express = require('express');
const router = express.Router();
const statusController = require(__basedir + '/app/controllers/statusController');

router.get('/', statusController.renderStatusPage);
router.get('/data', statusController.getStatusJson); // ✅ API 추가

module.exports = router;