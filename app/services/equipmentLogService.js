const db = require(__basedir + '/app/models/db');

exports.getAll = async () => {
  const result = await db.query(`
    SELECT l.*, e.model_name
    FROM equipment_data_log l
    JOIN equipment e ON l.equipment_id = e.equipment_id
    ORDER BY l.created_at DESC
  `);
  return result.rows;
};
