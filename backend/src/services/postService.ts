import pool from "../db";
import { newPost, post } from "../model/postModel";
import { userLike } from "../model/userModel";
import { comment } from "../model/commentModel";

export const getAllPosts = async (): Promise<post[]> => {
  const [rows] = await pool.query("SELECT * FROM posts");
  return rows as post[];
};

export const getPostsByUser = async (userId: number): Promise<post[]> => {
  const [rows] = await pool.query("SELECT * FROM posts WHERE userId = ?", [
    userId,
  ]);
  return rows as post[];
};

export const getPostWithCommentsById = async (postId: number): Promise<{ post: post | null, comments: comment[] }> => {
  // שליפת הפוסט
  const [postRows] = await pool.query("SELECT * FROM posts WHERE id = ?", [postId]);
  const post = (postRows as post[])[0] || null;

  if (!post) {
    return { post: null, comments: [] };
  }

  // שליפת התגובות של הפוסט
  const [commentRows] = await pool.query("SELECT * FROM comments WHERE postId = ?", [postId]);
  return { post, comments: commentRows as comment[] };
};

export async function createPost(newPostData: newPost): Promise<post | null> {
  const sql = `
    INSERT INTO posts (forumId, userId,title, content,  createdAt) VALUES (?, ?, ?, ?, NOW()) `;
  const values = [
    newPostData.forumId,
    newPostData.userId,
    newPostData.title,
    newPostData.content,

    newPostData.createdAt,
  ];

  try {
    const [result] = await pool.execute(sql, values);
    return newPostData as post; // Return the post object with the same structure
  } catch (err) {
    console.error("Error adding post:", err);
    return null;
  }
}

export const updatePostById = async (
  postId: number,
  data: { title: string; content: string }
) => {
  const [result]: any = await pool.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [data.title, data.content, postId]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [postId]);
  return (rows as any[])[0] || null;
};



export const deletePostById = async (postId: number): Promise<boolean> => {
  const [result]: any = await pool.query("DELETE FROM posts WHERE id = ?", [postId]);
  return result.affectedRows > 0;
};

export const getUsersWhoLikedPost = async (postId: number) => {
  const [rows] = await pool.query(
    `SELECT u.id, u.username, u.email
     FROM users u
     JOIN likes l ON u.id = l.userId
     WHERE l.postId = ?`,
    [postId]
  );
  return rows as userLike[];
};
