import express from "express";
import {
  getAllPostsController as getAllPosts,
  getPostsByUserController as getPostsByUser,
  getPostByIdController as getPostById,
  createPostController as createPost,
  updatePostController as updatePost,
  deletePostController as deletePost,
  getUsersWhoLikedPostController as getUsersWhoLikedPost,
} from "../controller/postController";
import authenticateToken from "../services/authMiddleware";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/user/:userId", getPostsByUser);
router.get("/:postId", getPostById);
router.get("/:postId/likes", getUsersWhoLikedPost);

router.post("/", createPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

export default router;
