import { Request, Response } from "express";
import * as bookService from "../services/bookService";

export const getAllBooksController = async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.json(books);
};

export const getBookByIdController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) { res.status(400).send("Invalid book ID");
    return
  }
  const book = await bookService.getBookById(id);
  if (!book)
    {res.status(404).send("Book not found");
    return;
  } 
     
  res.json(book);
};

export const addRatingController = async (req: Request, res: Response) => {
  const bookId = Number(req.params.id);
  const { userId, rating } = req.body;

  if (isNaN(bookId) || !userId || !rating) {
     res.status(400).send("Missing or invalid data");
     return
  }

  await bookService.addRating(bookId, userId, rating);
  res.json({ message: "Rating saved" });

};

export const getAverageRatingController = async (req: Request, res: Response) => {
  const bookId = Number(req.params.id);
  if (isNaN(bookId)) { res.status(400).send("Invalid book ID");
    return
  }

  const avg = await bookService.getAverageRating(bookId);

  if (typeof avg !== "number" || isNaN(avg)) {
    res.json({ average: null });
    return;
  }

  res.json({ averageRating: avg });
};
