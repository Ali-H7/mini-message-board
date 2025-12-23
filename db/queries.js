const pool = require('./pool');

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

async function addMessage(msg, user) {
  const insertQuery = 'INSERT INTO messages (user_text, user_name, date) VALUES ($1, $2, $3)';
  const message = [msg, user, new Date()];
  await pool.query(insertQuery, message);
}

async function lookForMessage(id) {
  const { rows } = await pool.query(`SELECT * FROM messages WHERE id = $1`, [id]);
  return rows[0];
}

module.exports = {
  getAllMessages,
  addMessage,
  lookForMessage,
};
