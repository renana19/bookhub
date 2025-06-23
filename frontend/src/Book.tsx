import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchResource, addResource } from "./DBAPI";
import { userContext } from "./App";
import "./Books.css";  // משתמש באותו CSS כמו הרשימה

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function Book() {
  const { id } = useParams<{ id: string }>();
  const { contextUser } = useContext(userContext);
  const [book, setBook] = useState<Book | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [myRating, setMyRating] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      fetchResource(`books/${id}`).then(setBook);
      fetchAverageRating();
    }
  }, [id]);

  const fetchAverageRating = async () => {
    const result = await fetchResource(`books/${id}/average-rating`);
    if (result) setAverageRating(result.averageRating);
  };

  const handleRating = async (rating: number) => {
    if (!contextUser) {
      alert("עליך להתחבר כדי לדרג.");
      return;
    }
    const response = await addResource(`books/${id}/rate`, {
      rating,
      userId: contextUser.id
    });
    if (response) {
      alert("תודה על הדירוג!");
      setMyRating(rating);
      fetchAverageRating();
    }
  };

  if (!book) return <p>טוען ספר...</p>;

  return (
    <div className="book-card" style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>{book.title}</h2>
      <p><strong>מחבר:</strong> {book.author}</p>
      <p className="book-description">{book.description}</p>

      <p><strong>דירוג ממוצע:</strong> {averageRating.toFixed(2)} ⭐</p>

      {contextUser && (
        <div>
          <p>דרג את הספר:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              style={{
                fontSize: "1.5rem",
                color: star <= (myRating || 0) ? "#ffc107" : "#e4e5e9",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              ★
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
