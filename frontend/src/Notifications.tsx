import { useEffect, useState, useContext } from "react";
import { userContext } from "./App";
import { Link } from "react-router-dom";

interface Notification {
  id: number;
  type: "comment" | "followed_user_post";
  postId: number;
  postTitle: string;
  fromUser: string;
  createdAt: string;
}

export default function Notifications() {
  const { contextUser } = useContext(userContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contextUser) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:8080/users/${contextUser.id}/notifications`);
        if (!res.ok) throw new Error("Failed to fetch notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [contextUser]);

  if (!contextUser) {
    return <p>יש להתחבר כדי לצפות בהתראות שלך.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>התראות</h2>

      {loading ? (
        <p>טוען...</p>
      ) : notifications.length === 0 ? (
        <p>אין התראות חדשות.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n) => (
            <li key={n.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem", paddingBottom: "1rem" }}>
              {n.type === "comment" && (
                <p>
                  💬 משתמש <strong>{n.fromUser}</strong> הגיב לפוסט שלך{" "}
                  <Link to={`/posts/${n.postId}`}>{n.postTitle}</Link>
                </p>
              )}
              {n.type === "followed_user_post" && (
                <p>
                  🧑‍💻 <strong>{n.fromUser}</strong> שעקבת אחריו פרסם פוסט חדש:{" "}
                  <Link to={`/posts/${n.postId}`}>{n.postTitle}</Link>
                </p>
              )}
              <small>{new Date(n.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
