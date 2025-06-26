import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { userContext } from "./App";
import {
  fetchResource,
  addResource,
  updateResource,
  deleteResource,
} from "./DBAPI";
import Comment from "./Comments";
import type { CommentModel, PostData, UserData } from "./models";
import { useNavigate } from "react-router-dom";


export default function Post() {
  const { postId } = useParams<{ postId: string }>();
  const { contextUser } = useContext(userContext);

  const [post, setPost] = useState<PostData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const [comments, setComments] = useState<CommentModel[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [newComment, setNewComment] = useState("");

  const [likedUsers, setLikedUsers] = useState<UserData[]>([]);
  const [showLikes, setShowLikes] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (postId) {
      loadPost();
      // loadComments();
    }
  }, [postId]);

  const loadPost = async () => {
    const data = await fetchResource(`posts/${postId}`);
    console.log("DATA FROM SERVER:", data);
    if (data) {
      setPost(data.post);
      setEditedTitle(data.post.title);
      setEditedContent(data.post.content);
      setComments(data.comments || []);

    };
  }
  // const loadComments = async () => {
  //   const data = await fetchResource(`comments/${postId}`);
  //   if (data) setComments(data);
  // };

  const loadLikes = async () => {
    if (!showLikes) {
      const users = await fetchResource(`posts/${postId}/likes`);
      if (users) setLikedUsers(users);
    }
    setShowLikes(!showLikes);
  };

  const handleUpdate = async () => {
    if (!post) return;
    const updated = await updateResource("posts", post.id, {
      title: editedTitle,
      content: editedContent,
    });
    console.log("UPDATED FROM SERVER:", updated);

    if (updated) {
      const updatedPost = updated.post || updated; // תמיכה בשני המקרים
      setPost(updatedPost);
      setIsEditing(false);
    } else {
      alert("עדכון הפוסט נכשל");
    }

  };

  const handleDelete = async () => {
    if (!post) return;
    const success = await deleteResource("posts", post.id);
    if (success) {
      // כאן את יכולה לנווט חזרה לפורום למשל
      alert("הפוסט נמחק");
    }
    navigate(`/forums/${post.forumId}`);  // מעביר לעמוד הפורום של הפוסט שנמחק
  };



const handleCommentUpdatedOrDeleted = (id: number, updated?: CommentModel) => {
  if (updated) {
    setComments(prev => prev.map(c => c.id === id ? updated : c));
  } else {
    setComments(prev => prev.filter(c => c.id !== id));
  }
};



  const handleAddComment = async () => {
    if (!newComment.trim() || !post) {
      alert("הכנס תוכן לתגובה");
      return;
    }
    const data = {
      postId: post.id,
      content: newComment,
      userId: contextUser.id,
    };
    const added = await addResource("comments", data);
    if (added) {
      setComments([...comments, added]);
      setNewComment("");
    }
  };

  const showMoreComments = () => {
    setVisibleCount((prev) => prev + 10);
  };

  if (!post) return <p>טוען פוסט...</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
      <div>
        <strong>
          <Link to={`/profile/${post.userId}`}>👤 משתמש {post.userId}</Link>
        </strong>
      </div>

      {isEditing ? (
        <>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>💾 שמור</button>
          <button onClick={() => setIsEditing(false)}>❌ בטל</button>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {contextUser?.id === post.userId && (
            <>
              <button onClick={() => setIsEditing(true)}>✏️ ערוך</button>
              <button onClick={handleDelete}>🗑️ מחק</button>
            </>
          )}
        </>
      )}

      <div style={{ marginTop: "0.5rem" }}>
        <button
          onClick={loadLikes}
          style={{ cursor: "pointer", background: "none", border: "none" }}
        >
          ❤️ לייקים
        </button>
        {showLikes && (
          <div
            style={{
              position: "absolute",
              top: "2rem",
              right: "1rem",
              background: "#fff",
              border: "1px solid #ccc",
              padding: "0.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {likedUsers.length === 0 ? (
              <p>אין לייקים עדיין</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {likedUsers.map((user) => (
                  <li key={user.id}>
                    <Link to={`/profile/${user.id}`}>{user.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div>
        <h4>תגובות</h4>
        {comments.slice(0, visibleCount).map((c) => (
          <Comment key={c.id} comment={c} onCommentUpdatedOrDeleted={handleCommentUpdatedOrDeleted} />
        ))}
        {visibleCount < comments.length && (
          <button onClick={showMoreComments}>טען עוד תגובות</button>
        )}
      </div>

      <div>
        <textarea
          placeholder="הוסף תגובה חדשה..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>💬 הוסף תגובה</button>
      </div>
    </div>
  );
}
