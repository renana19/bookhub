import { Request, Response } from "express";
import { getPostComments } from "../services/commentsService";

export const getCommentsController = async (req: Request, res: Response) => {
  const postId = Number(req.params.postId);
  if (isNaN(postId)) {
    res.status(400).send("Invalid post ID");
    return;
  }

  try {
    const comments = await getPostComments(postId);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
