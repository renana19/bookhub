import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchResource } from "./DBAPI";

interface Forum {
  id: number;
  title: string;
  description: string;
  createdBy: number;
  created_at: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
}

export default function Forum() {
  const { id } = useParams<{ id: string }>();
  const [forum, setForum] = useState<Forum | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForum = async () => {
      if (!id) return;
      const data = await fetchResource(`forums/${id}`);
      console.log("DATA FROM SERVER:", data);
      if (data) {
        setForum(data.forum);
        setPosts(data.posts);
      }
      setLoading(false);
    };

    loadForum();
  }, [id]);

  if (loading) return <p>טוען פורום...</p>;

  if (!forum) return <p>הפורום לא נמצא.</p>;

  return (
    <div className="forum-page">
      <h2>{forum.title}</h2>
      <p>{forum.description}</p>
      <p>
        <small>נוצר בתאריך: {new Date(forum.created_at).toLocaleString()}</small>
      </p>

      <h3>פוסטים בפורום</h3>
      {posts.length === 0 ? (
        <p>אין פוסטים בפורום זה עדיין.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "1rem" }}>
              <Link to={`/posts/${post.id}`}>
                <strong>{post.title}</strong>
              </Link>
              <p>{post.content.slice(0, 100)}...</p>
              <small>מאת משתמש {post.userId} בתאריך {new Date(post.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
