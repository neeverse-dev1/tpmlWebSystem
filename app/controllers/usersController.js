const ejs = require('ejs');
const path = require('path');
const usersService = require(__basedir + '/app/services/usersService');

exports.renderUserPage = async (req, res) => {
  const usersList = await usersService.getAll();
    res.render('base', {
        title: '사용자 관리',
        page: 'equipment',
        usersList,
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
        <script src="/js/equipment-ui.js"></script>
        `
    });
};

exports.createUser = async (req, res) => {
  await usersService.create(req.body);
  res.json({ success: true });
};

exports.updateUser = async (req, res) => {
  await usersService.update(req.params.id, req.body);
  res.json({ success: true });
};

exports.deleteUser = async (req, res) => {
  await usersService.delete(req.params.id);
  res.json({ success: true });
};
