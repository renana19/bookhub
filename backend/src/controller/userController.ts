import { Request, Response } from "express";
import { loginUser, newUser, user } from "../model/userModel";
import {
  addUser,
  getBasicUserInfo,
  getUserByUsername,
} from "../services/userService";
import { validateLogin, validateUser } from "../validator/userValidator";

export const getBasicUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number(req.params.userId);
  console.log("Fetching basic user info for ID:", req.params.userId);
  if (isNaN(userId)) {
    res.status(400).send("Invalid user ID");
    return;
  }
  try {
    const user = await getBasicUserInfo(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const userLogin: user = req.body;
  let validate = validateUser(userLogin);
  if (validate.success === false) {
    res.status(400).json(validate.errors);
    return;
  }

  //UPDATE THE USER IN THE DATABASE
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const userLogin: loginUser = req.body;
  let validate = validateLogin(userLogin);
  if (validate.success === false) {
    res.status(400).json(validate.errors);
    return;
  }

  try {
    const user = await getUserByUsername(userLogin.username);
    if (!user || userLogin.password !== user.passwordHash) {
      res.status(404).json({ message: "User not found" });
      return;
    } else if (userLogin.password === user.passwordHash) {
      res.status(200).json({ message: "Login successful", user });
      return;
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const user: newUser = req.body;
  let validate = validateUser(user);
  if (validate.success === false) {
    res.status(400).json(validate.errors);
    return;
  }

  try {
    const addedUser = await addUser(user);
    if (addedUser) {
      res
        .status(201)
        .json({ message: "User registered successfully", user: addedUser });
    } else {
      res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
