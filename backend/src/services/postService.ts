import pool from "../db";
import { Post } from "../model/postModel";
export const getPostsByUser = async (userId: number) => {
  const [rows] = await pool.query(
    "SELECT id, title, content, forumId, createdAt FROM posts WHERE userId = ?",
    [userId]
  );
  return rows;
};
