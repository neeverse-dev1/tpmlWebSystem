const db = require(__basedir + '/app/models/db');

exports.save = async (data) => {
  const {
    equipment_id,
    gps_lat,
    gps_long,
    temperature,
    humidity,
    pressure,
    timestamp
  } = data;

  return db.query(
    `INSERT INTO equipment_data_log 
     (equipment_id, gps_lat, gps_long, temperature, humidity, pressure, timestamp) 
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [equipment_id, gps_lat, gps_long, temperature, humidity, pressure, timestamp]
  );
};
