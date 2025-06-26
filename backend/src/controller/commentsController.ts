import { Request, Response } from "express";
import { addCommentService,updateCommentById, deleteCommentById} from "../services/commentsService";



// export const getCommentsController = async (req: Request, res: Response) => {
//   const postId = Number(req.params.postId);
//   if (isNaN(postId)) {
//     res.status(400).send("Invalid post ID");
//     return;
//   }

//   try {
//     const comments = await getPostComments(postId);
//     res.json(comments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// };



export const addCommentController = async (req: Request, res: Response) => {
  const { postId, userId, content } = req.body;

  if (!postId || !userId || !content?.trim()) {
     res.status(400).json({ error: "Missing required fields" });
     return
  }

  try {
    const addedComment = await addCommentService({ postId, userId, content });
    if (addedComment) {
      res.status(201).json(addedComment);
    } else {
      res.status(500).json({ error: "Failed to add comment" });
    }
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const updateCommentController = async (req: Request, res: Response): Promise<void> => {
  const commentId = Number(req.params.id);
  const { content } = req.body;

  if (isNaN(commentId)) {
    res.status(400).json({ error: "Invalid comment ID" });
    return;
  }

  if (!content) {
    res.status(400).json({ error: "Content is required" });
    return;
  }

  try {
    const updated = await updateCommentById(commentId, { content });
    if (!updated) {
      res.status(404).json({ error: "Comment not found" });
    } else {
      res.json(updated);
    }
  } catch (err) {
    console.error("Error updating comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCommentController = async (req: Request, res: Response): Promise<void> => {
  const commentId = Number(req.params.id);

  if (isNaN(commentId)) {
    res.status(400).json({ error: "Invalid comment ID" });
    return;
  }

  try {
    const success = await deleteCommentById(commentId);
    if (success) {
      res.json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
