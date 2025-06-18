import pool from '../db.js';

export const fetchAllBooks = async () => {
  const [rows] = await pool.query('SELECT * FROM Books');
  return rows;
};

export const fetchBookById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Books WHERE id = ?', [id]);
  return rows[0];
};

export const insertBook = async (book) => {
  const { title, author, genre, description, coverImageUrl } = book;
  const [result] = await pool.query(
    'INSERT INTO Books (title, author, genre, description, coverImageUrl) VALUES (?, ?, ?, ?, ?)',
    [title, author, genre, description, coverImageUrl]
  );
  return result.insertId;
};

export const removeBook = async (id) => {
  const [result] = await pool.query('DELETE FROM Books WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
