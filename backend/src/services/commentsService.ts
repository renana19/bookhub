import pool from "../db";
import { comment } from "../model/commentModel";
import { newPost, post } from "../model/postModel";
import { userLike } from "../model/userModel";

export const getAllPosts = async (): Promise<post[]> => {
  const [rows] = await pool.query("SELECT * FROM posts");
  return rows as post[];
};

export const getPostComments = async (postId: number): Promise<comment[]> => {
  const [rows] = await pool.query("SELECT * FROM comments WHERE postId = ?", [
    postId,
  ]);
  return rows as comment[];
};
