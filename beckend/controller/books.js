import {
    fetchAllBooks,
    fetchBookById,
    insertBook,
    removeBook
  } from '../service/booksData.js';
  
  export const getAllBooks = async (req, res) => {
    try {
      const books = await fetchAllBooks();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: 'שגיאה בשליפת ספרים' });
    }
  };
  
  export const getBookById = async (req, res) => {
    try {
      const book = await fetchBookById(req.params.id);
      if (!book) return res.status(404).json({ error: 'ספר לא נמצא' });
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: 'שגיאה בשליפת ספר' });
    }
  };
  
  export const addBook = async (req, res) => {
    try {
      const bookId = await insertBook(req.body);
      res.status(201).json({ id: bookId, ...req.body });
    } catch (err) {
      res.status(500).json({ error: 'שגיאה בהוספת ספר' });
    }
  };
  
  export const deleteBook = async (req, res) => {
    try {
      const success = await removeBook(req.params.id);
      if (success) {
        res.json({ message: 'הספר נמחק' });
      } else {
        res.status(404).json({ error: 'ספר לא נמצא' });
      }
    } catch (err) {
      res.status(500).json({ error: 'שגיאה במחיקת ספר' });
    }
  };
  