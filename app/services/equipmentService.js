const db = require(__basedir + '/app/models/db');

const getAll = async () => {
  const result = await db.query('SELECT * FROM equipment ORDER BY created_at DESC');
  return result.rows;
};

const getById = async (id) => {
  return db.query('SELECT * FROM equipment WHERE equipment_id = $1', [id]);
};

const create = async (data) => {
  const { equipment_id, model_name, etc, gps } = data;
  const [lat, long] = gps.split(',');
  return db.query(
    'INSERT INTO equipment (equipment_id, model_name, etc, gps_lat, gps_long) VALUES ($1, $2, $3, $4, $5)',
    [equipment_id, model_name, etc, lat, long]
  );
};

const update = async (id, data) => {
  const { model_name, etc, gps } = data;
  const [lat, long] = gps.split(',');
  return db.query(
    'UPDATE equipment SET model_name = $1, etc = $2, gps_lat = $3, gps_long = $4 WHERE equipment_id = $5',
    [model_name, etc, lat, long, id]
  );
};

const remove = async (id) => {
  return db.query('DELETE FROM equipment WHERE equipment_id = $1', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove
};
