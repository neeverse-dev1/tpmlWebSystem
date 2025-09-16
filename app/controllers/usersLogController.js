const ejs = require('ejs');
const path = require('path');
const usersLogService = require(__basedir + '/app/services/usersLogService');

exports.renderLogPage = async (req, res) => {
  const logList = await usersLogService.getAll();
  res.render('base', {
    title: '유저 로그',
    page: 'usersLog',
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
      <script src="/js/usersLog-ui.js"></script>
    `,
  });
};