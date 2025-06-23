import pool from "../db";

export const rateBook = async (bookId: number, userId: number, rating: number) => {
  await pool.query(
    `INSERT INTO book_ratings (bookId, userId, rating)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE rating = ?`,
    [bookId, userId, rating, rating]
  );
};

export const getAverageRating = async (bookId: number): Promise<number> => {
  const [rows] = await pool.query(
    "SELECT AVG(rating) as avgRating FROM book_ratings WHERE bookId = ?",
    [bookId]
  );
  return (rows as any)[0].avgRating || 0;
};
