import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function NewPost() {
  const { id } = useParams(); // forumId
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/forums/${id}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, forumId: id, userId: 1 }) // userId זמני
    });
    navigate(`/forums/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>פוסט חדש</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="כותרת" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="תוכן" />
      <button type="submit">שליחה</button>
    </form>
  );
}
