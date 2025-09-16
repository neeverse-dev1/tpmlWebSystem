const equipmentDataService = require(__basedir + '/app/services/equipmentDataService');

exports.receiveData = async (req, res) => {
  try {
    await equipmentDataService.save(req.body);
    res.json({ success: true });
  } catch (err) {
    console.error('데이터 저장 실패:', err);
    res.status(500).json({ success: false, error: '데이터 저장 실패' });
  }
};
