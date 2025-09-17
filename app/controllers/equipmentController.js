const dayjs = require('dayjs');
const equipmentService = require(__basedir + '/app/services/equipmentService');

exports.renderEquipmentPage = async (req, res) => {
  const equipmentList = await equipmentService.getAll();

  // 날짜 포맷 적용
  const formattedList = equipmentList.map(eq => {
    return {
      equipment_id: eq.equipment_id,
      model_name: eq.model_name,
      gps_lat: eq.gps_lat,
      gps_long: eq.gps_long,
      etc: eq.etc,
      created_at: dayjs(eq.created_at).format('YYYY-MM-DD HH:mm:ss'),
      updated_at: dayjs(eq.updated_at).format('YYYY-MM-DD HH:mm:ss')
    };
  });

  res.render('base', {
    title: '장비 관리',
    page: 'equipment',
    equipmentList: formattedList,
    custom_style_pre: ``,
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
      <script src="/js/equipment-ui.js"></script>
    `
  });
};

exports.createEquipment = async (req, res) => {
  await equipmentService.create(req.body);
  res.json({ success: true });
};

exports.updateEquipment = async (req, res) => {
  await equipmentService.update(req.params.id, req.body);
  res.json({ success: true });
};

exports.deleteEquipment = async (req, res) => {
  await equipmentService.delete(req.params.id);
  res.json({ success: true });
};
