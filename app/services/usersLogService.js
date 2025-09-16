const db = require(__basedir + '/app/models/db');

exports.getAll = async () => {
  const result = await db.query(`
    SELECT * FROM logs ORDER BY created_at DESC
  `);
  return result.rows;
};
