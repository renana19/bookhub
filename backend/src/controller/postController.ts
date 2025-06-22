import { Request, Response } from "express";
import { getPostsByUser as getPostsByUserService } from "../services/postService";

export const getPostsByUser = async (req: Request, res: Response): Promise<void> => {
  const userId = Number(req.params.userId);
  if (isNaN(userId)) {
     res.status(400).send("Invalid user ID");
        return;
  }

  try {
    const posts = await getPostsByUserService(userId);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
