const dayjs = require('dayjs');

const equipmentService = require(__basedir + '/app/services/equipmentService');
const equipmentLogService = require(__basedir + '/app/services/equipmentLogService');

exports.renderLogPage = async (req, res) => {
  const equipmentList = await equipmentService.getAll();
  const logList = await equipmentLogService.getAll();
  
  // 날짜 포맷 적용
  const formattedList = logList.map(log => {
    return {
      equipment_id: log.equipment_id,
      temperature: log.temperature,
      humidity: log.humidity,
      pressure: log.pressure,
      gps_lat: log.gps_lat,
      gps_long: log.gps_long,
      timestamp: log.timestamp,
      created_at: dayjs(log.created_at).format('YYYY-MM-DD HH:mm:ss'),
    };
  });

  res.render('base', {
    title: '장비 로그',
    page: 'equipmentLog',
    equipmentList,
    logList: formattedList,
    custom_style_pre: `
    `,
    custom_style: `
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <link rel="stylesheet" href="/assets/libs/datatables/datatables.min.css">
    `,
    custom_script_pre: `
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    `,
    custom_script: `
      <script src="/assets/libs/datatables/datatables.min.js"></script>
      <script src="/assets/js/datatable.js"></script>
      <script src="/js/equipmentLog-ui.js"></script>
    `,
  });
};