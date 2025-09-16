const statusService = require(__basedir + '/app/services/statusService');

exports.renderStatusPage = async (req, res) => {
  try {
    const statusData = await statusService.getStatus();
    res.render('base', {
        title: '서버 상태 정보',
        page: 'status',
        statusData,
        custom_style_pre: `
        `,
        custom_style: `
        `,
        custom_script_pre: `
        `,
        custom_script: `
        <script src="/assets/libs/chartjs/chart.js"></script>
        <script src="/assets/js/chartjs.js"></script>
        <script src="/js/status-ui.js"></script>
        `,
    });
  } catch (err){
    console.error('❌ 상태 정보 가져오기 실패:', err);
    res.status(500).send('서버 상태 정보를 가져올 수 없습니다.');
  }
};

exports.getStatusJson = async (req, res) => {
  try {
    const statusData = await statusService.getStatus();
    res.json({ success: true, data: statusData });
  } catch (err) {
    console.error('❌ 상태 JSON 가져오기 실패:', err);
    res.status(500).json({ success: false, message: '서버 상태 정보를 가져올 수 없습니다.' });
  }
};