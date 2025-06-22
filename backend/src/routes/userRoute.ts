import { Router } from "express";
import { login, register } from "../controller/userController";

const router = Router();

// POST /api/users
router.post("/register", register);



export default router;
