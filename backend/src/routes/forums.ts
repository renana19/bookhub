import express from "express";
import { getPopularForums } from "../controller/forumController";

const router = express.Router();

router.get("/popular", getPopularForums);;

export default router;
