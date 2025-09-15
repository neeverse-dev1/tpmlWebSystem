const db = require(__basedir + '/app/models/db');

const getAll = async () => {
  const result = await db.query('SELECT * FROM equipment ORDER BY created_at DESC');
  return result.rows;
};

module.exports = {
  getAll
};
