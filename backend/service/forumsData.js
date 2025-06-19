// import pool from './db.js';

// export const fetchAllForums = async () => {
//   const [rows] = await pool.query(`
//     SELECT Forums.*, Books.title AS bookTitle, Users.name AS userName
//     FROM Forums
//     JOIN Books ON Forums.bookId = Books.id
//     JOIN Users ON Forums.createdBy = Users.id
//     ORDER BY Forums.created_at DESC
//   `);
//   return rows;
// };

// export const fetchForumById = async (id) => {
//   const [rows] = await pool.query('SELECT * FROM Forums WHERE id = ?', [id]);
//   return rows[0];
// };

// export const insertForum = async (forum) => {
//   const { bookId, title, createdBy, isRecommendation } = forum;
//   const [result] = await pool.query(
//     'INSERT INTO Forums (bookId, title, createdBy, isRecommendation) VALUES (?, ?, ?, ?)',
//     [bookId, title, createdBy, isRecommendation]
//   );
//   return result.insertId;
// };

// export const removeForum = async (id) => {
//   const [result] = await pool.query('DELETE FROM Forums WHERE id = ?', [id]);
//   return result.affectedRows > 0;
// };
