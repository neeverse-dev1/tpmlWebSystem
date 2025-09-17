const db = require(__basedir + '/app/models/db');

exports.getAll = async () => {
  try {
    const result = await db.query(`SELECT * FROM dashboard_grid ORDER BY grid_index ASC`);
    return result.rows;
  } catch (err) {
    return [];
  }
};

exports.update = async (id, { equipment_id, view_type, title }) => {
  await db.query(`
    UPDATE dashboard_grid
    SET equipment_id = $1,
        view_type = $2,
        title = $3
    WHERE id = $4
  `, [equipment_id, view_type, title, id]);
};
