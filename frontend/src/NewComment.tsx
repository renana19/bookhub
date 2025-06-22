import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function NewComment() {
  const { id } = useParams(); // postId
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/posts/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, postId: id, userId: 1 }) // userId זמני
    });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="תגובה..."/>
      <button type="submit">שליחה</button>
    </form>
  );
}
