const db = require(__basedir + '/app/models/db');

const getAll = async () => {
  const result = await db.query('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows;
};

const getById = async (id) => {
  return db.query('SELECT * FROM users WHERE user_id = $1', [id]);
};

const create = async (data) => {
  const { userid, username, email, password, phone, expire_time, img_path, lastip } = data;
  return db.query(
    `INSERT INTO users (userid, username, email, password, phone, expire_time, img_path, lastip) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [userid, username, email, password, phone, expire_time, img_path, lastip]
  );
};

const update = async (id, data) => {
  const { username, email, password, phone, expire_time, img_path, lastip } = data;
  return db.query(
    `UPDATE users SET username = $1, email = $2, password = $3, phone = $4, expire_time = $5, img_path = $6, lastip = $7, updated_at = CURRENT_TIMESTAMP 
     WHERE userid = $8`,
    [username, email, password, phone, expire_time, img_path, lastip, id]
  );
};

const remove = async (id) => {
  return db.query('DELETE FROM users WHERE userid = $1', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove
};
