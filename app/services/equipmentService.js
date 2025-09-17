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

const getSensorData = async (equipmentId, limit = 100) => {
  const query = async (field) => {
    const result = await db.query(
      `SELECT ${field} AS value, timestamp FROM equipment_data_log
      WHERE equipment_id = $1 AND ${field} IS NOT NULL
      ORDER BY created_at DESC LIMIT $2`,
      [equipmentId, limit]
    );
    return result.rows;
  };

  const tempRows = await query('temperature');
  const humidRows = await query('humidity');
  const pressRows = await query('pressure');
  
  const extract = (rows) => {
  const values = rows.map(r => r.value);
  const timestamps = rows.map(r => r.timestamp);

  while (values.length < limit) {
    values.unshift(0);
    timestamps.unshift('N/A');
  }

  return { values, timestamps };
};

  const temp = extract(tempRows);
  const humid = extract(humidRows);
  const press = extract(pressRows);

  const fill = (rows) => {
    const values = rows.map(r => r.value);
    const timestamps = rows.map(r => r.timestamp);

    while (values.length < limit) {
      values.unshift(0);
      timestamps.unshift('N/A');
    }

    return { values, timestamps };
  };

  const lastTimestamp = [tempRows[0]?.timestamp, humidRows[0]?.timestamp, pressRows[0]?.timestamp]
    .filter(Boolean)
    .sort()
    .reverse()[0];

  const locationRow = await db.query(
    `SELECT gps_lat, gps_long
    FROM equipment_data_log
    WHERE equipment_id = $1
    ORDER BY created_at DESC
    LIMIT 1`,
    [equipmentId]
  );

  return {
    temp,
    humid,
    press,
    last_time: lastTimestamp,
    lat: locationRow.rows?.[0]?.gps_lat ?? 0,
    lng: locationRow.rows?.[0]?.gps_long ?? 0
  };
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
  getSensorData
};
