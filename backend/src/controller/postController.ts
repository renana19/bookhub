import { Request, Response } from "express";

import {
  createPost,
  deletePostById ,
  getAllPosts,
  getPostWithCommentsById,
  getPostsByUser,
  updatePostById,
  getUsersWhoLikedPost,
} from "../services/postService";
import { loginUser, newUser, user } from "../model/userModel";
import { newPost, post } from "../model/postModel";
import { validatePost } from "../validator/postValidator";
import { Jwt } from "jsonwebtoken";

const isOwn = (id: number, user: user) => {
  return id == user.id;
};

export const getAllPostsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await getAllPosts();
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "שגיאה בשליפת הפוסטים" });
  }
};

export const getPostsByUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number(req.params.userId);
  if (isNaN(userId)) {
    res.status(400).send("Invalid user ID");
    return;
  }
  const posts = await getPostsByUser(userId);
  res.json(posts);
};


export const getPostByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = Number(req.params.id);
    if (isNaN(postId)) {
      res.status(400).json({ error: "Invalid post ID" });
      return;
    }

    const { post, comments } = await getPostWithCommentsById(postId);

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json({ post, comments });
  } catch (err) {
    console.error("Error fetching post with comments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const createPostController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const post: newPost = req.body;
  let validate = validatePost(post);
  if (validate.success === false) {
    res.status(400).json(validate.errors);
    return;
  }

  try {
    const addedPost = await createPost(post);
    if (addedPost) {
      res
        .status(201)
        .json({ message: "post created successfully", post: createPost });
    } else {
      res.status(500).json({ message: "Failed to creat post" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updatePostController = async (req: Request, res: Response): Promise<void> => {
  const postId = Number(req.params.id);
  const { title, content } = req.body;

  if (isNaN(postId)) {
    res.status(400).json({ error: "Invalid post ID" });
    return;
  }

  if (!title || !content) {
    res.status(400).json({ error: "Title and content are required" });
    return;
  }

  try {
    const updated = await updatePostById(postId, { title, content });
    if (!updated) {
      res.status(404).json({ error: "Post not found" });
    } else {
      res.json(updated);
    }
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const deletePostController = async (req: Request, res: Response): Promise<void> => {
  const postId = Number(req.params.id);
  if (isNaN(postId)) {
    res.status(400).json({ error: "Invalid post ID" });
    return;
  }

  try {
    const success = await deletePostById(postId);
    if (success) {
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getUsersWhoLikedPostController = async (
  req: Request,
  res: Response
) => {
  const postId = Number(req.params.postId);
  if (isNaN(postId)) {
    res.status(400).send("Invalid post ID");
    return;
  }
  try {
    const users = await getUsersWhoLikedPost(postId);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// export const getUserPostsController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const userId = Number(req.params.userId);
//   if (isNaN(userId)) {
//     res.status(400).send("Invalid user ID");
//     return;
//   }
//   try {
//     const posts = await getPostsByUser(userId);
//     res.status(200).json(posts);
//   } catch (error) {
//     console.error("Error fetching user posts:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
