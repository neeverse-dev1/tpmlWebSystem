const ejs = require('ejs');
const path = require('path');
const equipmentLogService = require(__basedir + '/app/services/equipmentLogService');

exports.renderLogPage = async (req, res) => {
  const logList = await equipmentLogService.getAll();
  res.render('base', {
    title: '장비 로그',
    page: 'equipmentLog',
    logList,
    custom_style_pre: `
    `,
    custom_style: `
      <link rel="stylesheet" href="/assets/libs/datatables/datatables.min.css">
    `,
    custom_script_pre: `
    `,
    custom_script: `
      <script src="/assets/libs/datatables/datatables.min.js"></script>
      <script src="/assets/js/datatable.js"></script>
      <script src="/js/equipmentLog-ui.js"></script>
    `,
  });
};