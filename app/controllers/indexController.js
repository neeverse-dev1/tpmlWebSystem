const path = require('path');
const ejs = require('ejs');

const dashboardGridService = require(__basedir + '/app/services/dashboardGridService');
exports.renderIndexPage = async (req, res) => {

  const gridList = await dashboardGridService.getAll(); // DB에서 그리드 설정 불러오기

  const server = {
    cpu: 23,
    ram_used: 3.2,
    ram_total: 8,
    ram_percent: Math.round((3.2 / 8) * 100),
    disk_used: 120,
    disk_total: 256,
    disk_percent: Math.round((120 / 256) * 100),
    net_up: 12,
    net_down: 5,
    local_ip: '192.168.0.10',
    public_ip: '203.0.113.45',
    uptime: '3일 12시간 23분',
    started_at: '2025-09-14 03:12:00',
  };

  res.render('base', {
    title: '홈',
    page: 'index',
    gridList,
    server,
    custom_style_pre: '',
    custom_style: `
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    `,
    custom_script_pre: `
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    `,
    custom_script: `
      <script src="/assets/libs/chartjs/chart.js"></script>
      <script src="/assets/js/chartjs.js"></script>
      <script src="/js/dashboard-grid-ui.js"></script>
      <script src="/js/dashboard-ui.js"></script>
    `
  });
};

