import express from "express";
import {
  getAllBooksController,
  getBookByIdController,
  addRatingController,
  getAverageRatingController
} from "../controller/bookController";

const router = express.Router();

router.get("/", getAllBooksController);
router.get("/:id", getBookByIdController);
router.post("/:id/rate", addRatingController);
router.get("/:id/average-rating", getAverageRatingController);

export default router;
