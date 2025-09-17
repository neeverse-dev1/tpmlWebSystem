const dashboardGridService = require(__basedir + '/app/services/dashboardGridService');

exports.renderDashboardPage = async (req, res) => {
  const gridList = await dashboardGridService.getAll(); // DB에서 그리드 설정 불러오기
  console.log(gridList);
  res.render('base', {
    title: '대시보드',
    page: 'dashboard',
    gridList, // ✅ header.ejs에서 사용할 수 있게 넘겨줌
    custom_script: `<script src="/js/dashboard-grid-ui.js"></script>`
  });
};
