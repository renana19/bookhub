import { useEffect, useState } from "react";
import { fetchResource } from "./DBAPI";
import { Link } from "react-router-dom";
import "./css/Books.css";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchResource("books");
      if (data) setBooks(data);
    };
    loadBooks();
  }, []);

  if (books.length === 0) return <p>לא נמצאו ספרים</p>;

  return (
    <div className="books-list">
      <h2>📚 רשימת ספרים</h2>
      <div className="books-container">
        {books.map((book) => (
          <Link to={`/books/${book.id}`} className="book-card" key={book.id}>
            <h3>{book.title}</h3>
            <p>
              <strong>מחבר:</strong> {book.author}
            </p>
            <p className="book-description">
              {book.description.slice(0, 100)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
