import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import usersRoutes from './routes/users.js';
import forumsRoutes from './routes/forums.js';
import commentsRoutes from './routes/comments.js';
import booksRoutes from './routes/books.js';
import ratingsRoutes from './routes/ratings.js';
import followsRoutes from './routes/follows.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
router.put('/verify/:id', verifyToken, isAdmin, setVerifiedStatus);

app.use('/users', usersRoutes);
app.use('/forums', forumsRoutes);
app.use('/comments', commentsRoutes);
app.use('/books', booksRoutes);
app.use('/ratings', ratingsRoutes);
app.use('/follows', followsRoutes);

// ברירת מחדל - בדיקה שהשרת פעיל
app.get('/', (req, res) => {
  res.send('📚 BookHub API is running!');
});

export default app;
