import { Router } from "express";
import { getPostsByUser } from "../controller/postController";

const router = Router();

router.get("/user/:userId", getPostsByUser);


export default router;
