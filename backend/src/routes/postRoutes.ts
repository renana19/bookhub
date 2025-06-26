import express from "express";
import {
   addPostController,
  getPostsByUserController,
  getPostByIdController,
  
  updatePostController,
  deletePostController,
  getUsersWhoLikedPostController
} from "../controller/postController";
import authenticateToken from "../services/authMiddleware";

const router = express.Router();

router.get("/user/:userId", getPostsByUserController);
router.get("/:id", getPostByIdController);
router.get("/:postId/likes", getUsersWhoLikedPostController);
router.post("/", addPostController);

router.put("/:id", updatePostController);
router.delete("/:id", deletePostController);

export default router;
