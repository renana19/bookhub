import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface Post {
  id: number;
  title: string;
}

export default function Book() {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) return;

    const fetchBookAndPosts = async () => {
      try {
        const bookRes = await fetch(`http://localhost:8080/books/${bookId}`);
        const bookData = await bookRes.json();
        setBook(bookData);

        const postsRes = await fetch(`http://localhost:8080/books/${bookId}/posts`);
        const postsData = await postsRes.json();
        setPosts(postsData);
      } catch (err) {
        console.error("שגיאה בטעינת ספר או פוסטים:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookAndPosts();
  }, [bookId]);

  return (
    <div style={{ padding: "2rem" }}>
      {loading ? (
        <p>טוען...</p>
      ) : book ? (
        <>
          <h2>{book.title}</h2>
          <p><strong>מאת:</strong> {book.author}</p>
          <p>{book.description}</p>

          <h3>📝 פוסטים על הספר</h3>
          {posts.length === 0 ? (
            <p>אין פוסטים על הספר הזה עדיין.</p>
          ) : (
            <ul>
              {posts.map(post => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>הספר לא נמצא.</p>
      )}
    </div>
  );
}
