import { useEffect, useState , useContext} from "react";
import { useParams, Link } from "react-router-dom";
import { fetchResource, addResource } from "./DBAPI";
import { userContext } from "./App";


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


  const { contextUser } = useContext(userContext);



 const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

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

  const handleAddPost = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("נא למלא כותרת ותוכן");
      return;
    }
    if (!contextUser) {
      alert("עליך להיות מחובר כדי להוסיף פוסט");
      return;
    }
    const data = {
      forumId: Number(id),
      userId: contextUser.id,
      title: newTitle,
      content: newContent
    };
    const added = await addResource("posts", data);
    if (added) {
      setPosts([...posts, added]);
      setNewTitle("");
      setNewContent("");
    } else {
      alert("הוספת הפוסט נכשלה");
    }
  };

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
    <h3>📝 הוסף פוסט חדש</h3>
      {contextUser ? (
        <div style={{ marginTop: "1rem" }}>
          <input
            type="text"
            placeholder="כותרת הפוסט"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <textarea
            placeholder="תוכן הפוסט"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={{ width: "100%", minHeight: "100px" }}
          />
          <button onClick={handleAddPost} style={{ marginTop: "0.5rem" }}>
            💬 הוסף פוסט
          </button>
        </div>
      ) : (
        <p>🔒 עליך להיות מחובר כדי להוסיף פוסט</p>
      )}
    </div>
  );
}
