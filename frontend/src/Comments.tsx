import { Comment } from "./models"; // או להגדיר את ה-interface פה

interface Props {
  comment: Comment;
}

export default function Comment({ comment }: Props) {
  return (
    <div style={{ borderTop: "1px solid #eee", padding: "0.5rem 0" }}>
      <p>{comment.content}</p>
      <small>🕒 {new Date(comment.createdAt).toLocaleString()}</small> | 
      <small>👤 משתמש {comment.userId}</small>
    </div>
  );
}
