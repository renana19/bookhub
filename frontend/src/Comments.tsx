import type { CommentModel } from "./models";

interface Props {
  comment: CommentModel;
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
