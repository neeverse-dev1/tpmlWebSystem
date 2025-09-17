const express = require('express');
const router = express.Router();
const equipmentService = require(__basedir + '/app/services/equipmentService');

router.get('/:id/status', async (req, res) => {
  const { id } = req.params;
  const limit = parseInt(req.query.limit) || 100;

  try {
    const data = await equipmentService.getSensorData(id, limit);
    res.json({ success: true, data });
  } catch (err) {
    console.error('장비 상태 조회 실패:', err);
    res.status(500).json({ success: false, message: '장비 상태 조회 실패' });
  }
});

module.exports = router;
