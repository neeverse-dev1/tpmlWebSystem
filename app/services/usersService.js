const db = require(__basedir + '/app/models/db');

const getAll = async () => {
  try {
    const result = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
  } catch (err) {
    console.error('❌ 사용자 목록 조회 실패:', err);
    return [];
  }
};

const getById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return result.rows[0] || null;
  } catch (err) {
    console.error('❌ 사용자 조회 실패:', err);
    return null;
  }
};

const create = async (data) => {
  const { userid, username, email, password, phone, expire_time, img_path, lastip } = data;
  try {
    await db.query(
      `INSERT INTO users (userid, username, email, password, phone, expire_time, img_path, lastip) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userid, username, email, password, phone, expire_time, img_path, lastip]
    );
    return true;
  } catch (err) {
    console.error('❌ 사용자 등록 실패:', err);
    return false;
  }
};

const update = async (id, data) => {
  const { username, email, password, phone, expire_time, img_path, lastip } = data;
  try {
    await db.query(
      `UPDATE users SET username = $1, email = $2, password = $3, phone = $4, expire_time = $5, img_path = $6, lastip = $7, updated_at = CURRENT_TIMESTAMP 
       WHERE userid = $8`,
      [username, email, password, phone, expire_time, img_path, lastip, id]
    );
    return true;
  } catch (err) {
    console.error('❌ 사용자 수정 실패:', err);
    return false;
  }
};

const remove = async (id) => {
  try {
    await db.query('DELETE FROM users WHERE userid = $1', [id]);
    return true;
  } catch (err) {
    console.error('❌ 사용자 삭제 실패:', err);
    return false;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove
};
