import express from "express";
import { addCommentController,updateCommentController,deleteCommentController } from "../controller/commentsController";

const router = express.Router();

router.post("/", addCommentController);

router.put("/:id", updateCommentController);
router.delete("/:id", deleteCommentController);


export default router;
