// routes/api/server.js
const express = require('express');
const router = express.Router();
const serverStatusService = require(__basedir + '/app/services/serverStatusService');

router.get('/status', async (req, res) => {
  try {
    const status = await serverStatusService.getStatus();
    res.json({ success: true, data: status });

  } catch (err) {
    console.error('서버 상태 오류:', err);
    res.status(500).json({ success: false, message: '서버 상태 조회 실패' });
  }
});

module.exports = router;
