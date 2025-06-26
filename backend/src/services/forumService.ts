import pool from "../db";
import { Forum } from "../model/forumModel";
import { post } from "../model/postModel";

export const getForumsSortedByPostCount = async (): Promise<Forum[]> => {
  const query = `
    SELECT f.id, f.title, f.description, COUNT(p.id) as postCount
    FROM forums f
    LEFT JOIN posts p ON f.id = p.forumId
    GROUP BY f.id, f.title, f.description
    ORDER BY postCount DESC`;

  const [rows] = await pool.query(query);
  return rows as Forum[];
};

export const getForumWithPostsById = async (forumId: number): Promise<{ forum: Forum | null, posts: post[] }> => {
  // קודם נביא את הפורום
  const [forumRows] = await pool.query("SELECT * FROM forums WHERE id = ?", [forumId]);
  const forum = (forumRows as Forum[])[0] || null;

  if (!forum) {
    return { forum: null, posts: [] };
  }

  // עכשיו נביא את הפוסטים ששייכים לפורום הזה
  const [postRows] = await pool.query("SELECT * FROM posts WHERE forumId = ?", [forumId]);
  return { forum, posts: postRows as post[] };
};