import pool from "../db";
import { newPost, post } from "../model/postModel";
import { userLike } from "../model/userModel";

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

export const getPostById = async (postId: number): Promise<post | null> => {
  const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [postId]);
  return (rows as post[])[0] || null;
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

export const updatePost = async (
  postId: number,
  updatedPost: Partial<post>
): Promise<post | null> => {
  const sql = `UPDATE posts SET 
   title = COALESCE(?, title), content = COALESCE(?, content)
    WHERE id = ?
  `;
  const values = [updatedPost.title, updatedPost.content];

  try {
    const [result] = await pool.execute(sql, values);
    if ((result as any).affectedRows > 0) {
      return { title: updatedPost.title, content: updatedPost.content } as post; // Return the updated post object
    }
    return null; // No user found or no changes made
  } catch (err) {
    console.error("Error updating post:", err);
    return null;
  }
};

export const deletePost = async (postId: number): Promise<boolean> => {
  const sql = "DELETE FROM posts WHERE id = ?";
  const values = [postId];

  try {
    const [result] = await pool.execute(sql, values);
    return (result as any).affectedRows > 0; // Return true if a post was deleted
  } catch (err) {
    console.error("Error deleting post:", err);
    return false; // Return false on error
  }
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
