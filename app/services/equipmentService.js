const db = require(__basedir + '/app/models/db');

const getAll = async () => {
  const result = await db.query('SELECT * FROM equipment ORDER BY created_at DESC');
  return result.rows;
};

const getById = async (id) => {
  return db.query('SELECT * FROM equipment WHERE equipment_id = $1', [id]);
};

const create = async (data) => {
  const { equipment_id, model_name, voltage, signal_strength, gps } = data;
  const [lat, long] = gps.split(',');
  return db.query(
    'INSERT INTO equipment (equipment_id, model_name, voltage, signal_strength, gps_lat, gps_long) VALUES ($1, $2, $3, $4, $5, $6)',
    [equipment_id, model_name, voltage, signal_strength, lat, long]
  );
};

const update = async (id, data) => {
  const { model_name, voltage, signal_strength, gps } = data;
  const [lat, long] = gps.split(',');
  return db.query(
    'UPDATE equipment SET model_name = $1, voltage = $2, signal_strength = $3, gps_lat = $4, gps_long = $5 WHERE equipment_id = $6',
    [model_name, voltage, signal_strength, lat, long, id]
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
