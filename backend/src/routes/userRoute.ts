import { Router } from "express";
import { login, register, getBasicUser } from "../controller/userController";

const router = Router();

// POST /api/users
router.post("/register", register);
router.get("/:userId", getBasicUser);

export default router;
