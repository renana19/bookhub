import pool from "../db";
import { Book, Rating } from "../model/bookModel";

export const getAllBooks = async (): Promise<Book[]> => {
  const [rows] = await pool.query("SELECT * FROM books");
  return rows as Book[];
};

export const getBookById = async (id: number): Promise<Book | null> => {
  const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
  return (rows as Book[])[0] || null;
};

export const addRating = async (bookId: number, userId: number, rating: number): Promise<void> => {
  await pool.query(
    "INSERT INTO ratings (bookId, userId, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?",
    [bookId, userId, rating, rating]
  );
};

export const getAverageRating = async (bookId: number): Promise<number | null> => {
  const [rows] = await pool.query("SELECT AVG(rating) as average FROM ratings WHERE bookId = ?", [bookId]);
  const result = (rows as { average: number | null }[])[0];
  return result?.average || null;
};
