// api/dashboard.js
const express = require('express');
const router = express.Router();
const dashboardGridService = require(__basedir + '/app/services/dashboardGridService');


router.post('/grid/update', async (req, res) => {
  try {
    const configs = req.body; // ✅ 바로 배열로 받기

    for (const config of configs) {
      await dashboardGridService.update(config.id, {
        equipment_id: config.equipment_id,
        view_type: config.view_type,
        title: config.title
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('그리드 수정 오류:', err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

module.exports = router;
