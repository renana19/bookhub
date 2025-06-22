import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./App";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function MyPosts() {
  const { contextUser } = useContext(userContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contextUser) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:8080/users/${contextUser.id}/posts`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [contextUser]);

  const handleDelete = async (postId: number) => {
    if (!window.confirm("האם את בטוחה שברצונך למחוק את הפוסט?")) return;

    try {
      const res = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete post");
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  if (!contextUser) {
    return <p>עליך להתחבר כדי לצפות בפוסטים שלך.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>הפוסטים שלי</h2>

      {loading ? (
        <p>טוען...</p>
      ) : posts.length === 0 ? (
        <p>עדיין לא פרסמת פוסטים.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>נכתב בתאריך: {new Date(post.createdAt).toLocaleDateString()}</small>
              <div style={{ marginTop: "0.5rem" }}>
                <Link to={`/posts/${post.id}/edit`} style={{ marginRight: "1rem" }}>✏️ עריכה</Link>
                <button onClick={() => handleDelete(post.id)}>🗑️ מחיקה</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
