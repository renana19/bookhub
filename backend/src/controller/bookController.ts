import { Request, Response } from "express";
import { rateBook, getAverageRating } from "../services/bookService";
import jwt from "jsonwebtoken";

//חיפוש ספרים לפי שם, מחבר, קטגוריה


//לכתוב פונקציה הוספת ספר מיועדת רק לסופרים מאושרים
//


//משתמש יכול לדרג ספרים
// export const rateBookController = async (req: Request, res: Response): Promise<void> => {
//     const bookId = Number(req.params.bookId);
//     const userId = req. user?.id; // Assuming user ID is stored in req.user after authentication
//     const { rating } = req.body;

//     if (isNaN(bookId) || !userId) res.status(400).send("Invalid data");
//     if (!rating || rating < 1 || rating > 5) res.status(400).send("Invalid rating");

//     await rateBook(bookId, userId, rating);
//     res.send("Rating saved");
// };

// export const getAverageRatingController = async (req: Request, res: Response) => {
//     const bookId = Number(req.params.bookId);
//     if (isNaN(bookId)) {
//         res.status(400).send("Invalid book ID")
//         return
//     };
//     const avg = await getAverageRating(bookId);
//     res.json({ averageRating: avg });
// };
