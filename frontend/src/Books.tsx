import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("שגיאה בטעינת ספרים:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📚 רשימת ספרים</h2>

      {loading ? (
        <p>טוען...</p>
      ) : books.length === 0 ? (
        <p>לא נמצאו ספרים.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                {book.title} מאת {book.author}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
