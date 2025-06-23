import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "./App";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();
  const { contextUser } = useContext(userContext);
  const [userInfo, setUserInfo] = useState<any>(null);
  type Post = { id: number; title: string; content: string };
  const [posts, setPosts] = useState<Post[]>([]);

  const isOwnProfile = contextUser && contextUser.id === Number(userId);

  useEffect(() => {
     
    fetch(`http://localhost:8080/users/${userId}`)
      .then(res => res.json())
      .then(data => setUserInfo(data));

    fetch(`http://localhost:8080/posts/user/${userId}`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [userId]);

  if (!userInfo) return <p>טוען פרופיל...</p>;

  return (
    <div className="user-profile">
      <h2>👤 פרופיל משתמש</h2>
      <p><strong>שם:</strong> {userInfo.name}</p>
      <p><strong>אימייל:</strong> {userInfo.email}</p>

      {isOwnProfile && (
        <nav>
          <Link to="/notifications">🔔 התראות</Link>
          <Link to="/followers">👥 עוקבים</Link>
          <Link to="/following">👣 במעקב</Link>
          <Link to="/profile-settings">⚙️ עריכת פרופיל</Link>
        </nav>
      )}

      <h3>📝 הפוסטים של {userInfo.name}</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            {isOwnProfile && (
              <>
                <button>✏️ עדכן</button>
                <button>🗑️ מחק</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
