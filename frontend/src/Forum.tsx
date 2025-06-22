import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { userContext } from './App';

type Forum = {
  id: number;
  title: string;
  description: string;
};

export default function ForumsPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const { contextUser } = useContext(userContext);

  useEffect(() => {
    fetch('http://localhost:8080/forums')
      .then(res => res.json())
      .then(data => setForums(data));
  }, []);

  return (
    <div>
      <h2>פורומים</h2>
      {forums.map(f => (
        <div key={f.id}>
          <Link to={`/forums/${f.id}`}>{f.title}</Link>
          <p>{f.description}</p>
        </div>
      ))}
      {!contextUser && <p style={{ color: "gray" }}>כדי לפרסם פוסט – יש להתחבר</p>}
    </div>
  );
}
