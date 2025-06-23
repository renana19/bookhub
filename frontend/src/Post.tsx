import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./App";
import {
  fetchResource,
  addResource,
  updateResource,
  deleteResource,
} from "./DBAPI";
import Comment from "./Comments";
import type { CommentModel, PostData } from "./models";

interface PostProps {
  post: PostData;
  onPostUpdated: (id: number, data: Partial<PostData>) => void;
  onPostDeleted: (id: number) => void;
}

export default function Post({
  post,
  onPostUpdated,
  onPostDeleted,
}: PostProps) {
  const { contextUser } = useContext(userContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  const [comments, setComments] = useState<CommentModel[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    loadComments();
  }, [post.id]);

  const loadComments = async () => {
    const data = await fetchResource(`posts/${post.id}/comments`);
    if (data) setComments(data);
  };

  const handleUpdate = async () => {
    await onPostUpdated(post.id, {
      title: editedTitle,
      content: editedContent,
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await onPostDeleted(post.id);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
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

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}
    >
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

      <div>
        <h4>תגובות</h4>
        {comments.slice(0, visibleCount).map((c: CommentModel) => (
          <Comment key={c.id} comment={c} />
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
