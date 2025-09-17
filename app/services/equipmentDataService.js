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

  // 현재 시간으로 updated_at 설정
  const updated_at = new Date();

  // 트랜잭션으로 처리 (권장)
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // 1️⃣ 로그 저장
    await client.query(
      `INSERT INTO equipment_data_log 
       (equipment_id, gps_lat, gps_long, temperature, humidity, pressure, timestamp) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [equipment_id, gps_lat, gps_long, temperature, humidity, pressure, timestamp]
    );

    // 2️⃣ 장비 위치 및 수정시간 업데이트
    await client.query(
      `UPDATE equipment 
       SET gps_lat = $1, gps_long = $2, updated_at = $3 
       WHERE equipment_id = $4`,
      [gps_lat, gps_long, updated_at, equipment_id]
    );

    await client.query('COMMIT');
    return { success: true };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};