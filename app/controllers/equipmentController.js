const ejs = require('ejs');
const path = require('path');
const equipmentService = require(__basedir + '/app/services/equipmentService');

exports.renderEquipmentPage = async (req, res) => {
  const equipmentList = await equipmentService.getAll();

  res.render('base', {
    title: '장비 관리',
    page: 'equipment',
    equipmentList,
    custom_style_pre: `
    `,
    custom_style: `
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    `,
    custom_script_pre: `
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    `,
    custom_script: `
      <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
      <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
      <script src="/js/equipment-ui.js"></script>
    `
  });
};
