import { Router } from "express";
import {  register, getBasicUser ,getUserByUsernameController} from "../controller/userController";

const router = Router();

// POST /api/users

router.post("/register", register);
router.get("/username/:username", getUserByUsernameController);

router.get("/:userId", getBasicUser);
  


export default router;
