import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "./App";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  content: string;
  forumId: number;
  userId: number;
  createdAt: string;
};

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const { contextUser } = useContext(userContext);
  const [userInfo, setUserInfo] = useState<any>(contextUser);
  const [posts, setPosts] = useState<Post[]>([]);

  console.log("User ID:", userId);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/posts/user/${userId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserInfo();
    fetchUserPosts();
  }, [userId]);

  const isOwnProfile = contextUser && contextUser.id === Number(userId);

  console.log("User Profile:", contextUser);

  if (!userInfo) return <p>טוען פרופיל...</p>;

  return (
    <div className="user-profile">
      <h2>👤 פרופיל משתמש</h2>
      <p>
        <strong>שם:</strong> {userInfo.fullname}
      </p>
      <p>
        <strong>אימייל:</strong> {userInfo.email}
      </p>

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
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
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
