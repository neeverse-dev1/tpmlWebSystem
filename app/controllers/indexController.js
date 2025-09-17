const path = require('path');
const ejs = require('ejs');

const dashboardGridService = require(__basedir + '/app/services/dashboardGridService');
exports.renderIndexPage = async (req, res) => {

  const gridList = await dashboardGridService.getAll(); // DB에서 그리드 설정 불러오기

  res.render('base', {
    title: '홈',
    page: 'index',
    gridList,
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

