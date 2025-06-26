import { Request, Response } from "express";
import { getForumsSortedByPostCount , getForumWithPostsById } from "../services/forumService";

export const getPopularForumsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const forums = await getForumsSortedByPostCount();
    res.json(forums);
  } catch (err) {

    console.error("Error getting popular forums:", err);
console.error("Full error:", JSON.stringify(err, null, 2));

    res.status(500).json({ error: "Failed to fetch forums" });
  }
};



export const getForumByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const forumId = Number(req.params.id);
    if (isNaN(forumId)) {
      res.status(400).json({ error: "Invalid forum ID" });
      return;
    }

    const { forum, posts } = await getForumWithPostsById(forumId);

    if (!forum) {
      res.status(404).json({ error: "Forum not found" });
      return;
    }

    res.json({ forum, posts });
  } catch (err) {
    console.error("Error fetching forum with posts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


