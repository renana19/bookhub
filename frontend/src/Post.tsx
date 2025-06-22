import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

export default function Post() {
  const { id } = useParams(); // id של הפוסט
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/posts/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error('Failed to fetch comments', err));
  }, [id]);

  return (
    <div>
      <h3>תגובות</h3>
      <ul>
        {comments.map(c => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </div>
  );
}
