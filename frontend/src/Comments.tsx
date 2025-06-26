import { useState, useContext } from "react";
import { userContext } from "./App";
import { updateResource, deleteResource } from "./DBAPI";
import type { CommentModel } from "./models";

interface Props {
  comment: CommentModel;
  onCommentUpdatedOrDeleted?: (id: number, updated?: CommentModel) => void;
}

export default function Comment({ comment, onCommentUpdatedOrDeleted }: Props) {
  const { contextUser } = useContext(userContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveClick = async () => {
    const updated = await updateResource("comments", comment.id, { content: editedContent });
    if (updated) {
      if (onCommentUpdatedOrDeleted) onCommentUpdatedOrDeleted(comment.id, updated);
      setIsEditing(false);
      setEditedContent(updated.content);

    } else {
      alert("עדכון נכשל");
    }
  };

  const handleDeleteClick = async () => {
    const success = await deleteResource("comments", comment.id);
    if (success) {
      if (onCommentUpdatedOrDeleted) onCommentUpdatedOrDeleted(comment.id);
    } else {
      alert("מחיקה נכשלה");
    }
  };

  return (
    <div
      style={{
        borderTop: "1px solid #eee",
        padding: "0.5rem 0",
        position: "relative"
      }}
    >
      {isEditing ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{ width: "100%" }}
          />
          <div>
            <button onClick={handleSaveClick} style={{ marginRight: "0.5rem" }}>💾 שמור</button>
            <button onClick={handleCancelClick}>❌ בטל</button>
          </div>
        </>
      ) : (
        <>
          <p>{comment.content}</p>
          <small>🕒 {new Date(comment.createdAt).toLocaleString()}</small> | 
          <small> 👤 משתמש {comment.userId}</small>
        </>
      )}

      {contextUser?.id === comment.userId && !isEditing && (
        <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
          <button
            onClick={handleEditClick}
            style={{
              fontSize: "0.8rem",
              padding: "0.2rem 0.4rem",
              marginRight: "0.2rem"
            }}
          >
            ✏️
          </button>
          <button
            onClick={handleDeleteClick}
            style={{
              fontSize: "0.8rem",
              padding: "0.2rem 0.4rem"
            }}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}
