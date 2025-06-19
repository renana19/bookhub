import pool from '../db.js';

// שליפת משתמש לפי ID
export async function getUserById(id) {
  const [rows] = await pool.query(
    'SELECT id, username, avatar_url, bio FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
}

// שליפת כל המשתמשים (לרשימת משתמשים)
export async function getAllUsers() {
  const [rows] = await pool.query(
    'SELECT id, username, avatar_url FROM users'
  );
  return rows;
}

// הוספת משתמש חדש
export async function createUser({ username, avatar_url, bio }) {
  const [result] = await pool.query(
    'INSERT INTO users (username, avatar_url, bio) VALUES (?, ?, ?)',
    [username, avatar_url, bio]
  );
  return { id: result.insertId, username, avatar_url, bio };
}

// עדכון פרופיל משתמש
export async function updateUser(id, { username, avatar_url, bio }) {
  await pool.query(
    'UPDATE users SET username = ?, avatar_url = ?, bio = ? WHERE id = ?',
    [username, avatar_url, bio, id]
  );
  return getUserById(id);
}

// מחיקת משתמש לפי ID
export async function deleteUser(id) {
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
}
