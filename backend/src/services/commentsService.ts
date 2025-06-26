import pool from "../db";
import { comment ,NewCommentData} from "../model/commentModel";
// import { newPost, post } from "../model/postModel";
// import { userLike } from "../model/userModel";

// export const getAllPosts = async (): Promise<post[]> => {
//   const [rows] = await pool.query("SELECT * FROM posts");
//   return rows as post[];
// };

// export const getPostComments = async (postId: number): Promise<comment[]> => {
//   const [rows] = await pool.query("SELECT * FROM comments WHERE postId = ?", [
//     postId,
//   ]);
//   return rows as comment[];
// };





export const addCommentService = async (data: NewCommentData): Promise<comment | null> => {
  try {
    const sql = `
      INSERT INTO comments ( userId, content, created_at, postId)
      VALUES (?, ?, NOW(), ?)
    `;
    const values = [ data.userId, data.content,data.postId];
    const [result]: any = await pool.execute(sql, values);

    const insertedId = result.insertId;

    // שליפת התגובה שהוכנסה
    const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [insertedId]);
    return (rows as comment[])[0] || null;
  } catch (err) {
    console.error("DB error adding comment:", err);
    return null;
  }
};


export const updateCommentById = async (
  commentId: number,
  data: { content: string }
) => {
  const [result]: any = await pool.query(
    "UPDATE comments SET content = ?  WHERE id = ?",
    [data.content, commentId]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [commentId]);
  return (rows as any[])[0] || null;
};

export const deleteCommentById = async (commentId: number): Promise<boolean> => {
  const [result]: any = await pool.query(
    "DELETE FROM comments WHERE id = ?",
    [commentId]
  );
  return result.affectedRows > 0;
};
