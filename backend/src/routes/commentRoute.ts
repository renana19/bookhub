import express from "express";
import { getCommentsController } from "../controller/commentsController";
//import { rateBookController as rateBook , getAverageRatingController as  getAverageRating } from "../controller/bookController";

const router = express.Router();

router.get("/:postId", getCommentsController);

export default router;
