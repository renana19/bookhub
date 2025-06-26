import express from "express";
import { getPopularForumsController as getPopularForums 
    ,getForumByIdController as getforumById
} from "../controller/forumController";

const router = express.Router();

router.get("/popular", getPopularForums);

router.get("/:id", getforumById);


export default router;
