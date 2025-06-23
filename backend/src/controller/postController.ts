import { Request, Response } from "express";

import { createPost, deletePost, getAllPosts, getPostById, getPostsByUser, updatePost } from "../services/postService";
import { loginUser, newUser, user } from "../model/userModel";
import { newPost, post } from "../model/postModel";
import { validatePost } from "../validator/postValidator";
import { Jwt } from "jsonwebtoken";

const isOwn = (id: number, user: user) => {
    return id == user.id;
}


export const getAllPostsController = async (req: Request, res: Response): Promise<void> => {

    try {
        console.log('in get all');

        const posts = await getAllPosts();
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "שגיאה בשליפת הפוסטים" });
    }
};

export const getPostsByUserController = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).send("Invalid user ID");
        return
    }
    const posts = await getPostsByUser(userId);
    res.json(posts);
};

export const getPostByIdController = async (req: Request, res: Response) => {
    const postId = Number(req.params.postId);
    if (isNaN(postId)) res.status(400).send("Invalid post ID");
    const post = await getPostById(postId);
    if (post) res.json(post);
    else res.status(404).send("Post not found");
};

export const createPostController = async (req: Request, res: Response): Promise<void> => {
    const post: newPost = req.body;
    let validate = validatePost(post);
    if (validate.success === false) {
        res.status(400).json(validate.errors);
        return;
    }

    try {
        const addedPost = await createPost(post);
        if (addedPost) {
            res
                .status(201)
                .json({ message: "post created successfully", post: createPost });
        } else {
            res.status(500).json({ message: "Failed to creat post" });
        }
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePostController = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedPost: post = req.body;
        let validate = validatePost(updatedPost);
        const postId = Number(req.params.postId);
        if (isNaN(postId)) {
            res.status(400).send("Invalid post ID");
            return
        }
        if (!req.body || !req.body.title || !req.body.user_id) {
            throw new Error('הנתונים לא  מספקים.');
        }
        let response = await updatePost(postId, req.body);
        console.log('עודכן בהצלחה');
        res.status(200).json('פרטי המשימה עודכנו בהצלחה');
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json(error.message);
        } else {
            res.status(500).json("An unknown error occurred");
        }
    }
};

export const deletePostController = async (req: Request, res: Response) => {
    const postId = Number(req.params.postId);
    if (isNaN(postId)) res.status(400).send("Invalid post ID");

    const post = await getPostById(postId);
    if (!post) res.status(404).send("Post not found");
    if (req.user?.id !== post?.userId) res.status(403).send("Unauthorized");

    await deletePost(postId);
    res.send("Post deleted");
};
