import express from "express";
import {
   getAllPostsController,
  getPostsByUserController,
  getPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
  getUsersWhoLikedPostController
} from "../controller/postController";
import authenticateToken from "../services/authMiddleware";

const router = express.Router();

router.get("/", getAllPostsController);
router.get("/user/:userId", getPostsByUserController);
router.get("/:id", getPostByIdController);
router.get("/:postId/likes", getUsersWhoLikedPostController);
router.post("/", createPostController);
router.put("/:id", updatePostController);
router.delete("/:id", deletePostController);

export default router;
