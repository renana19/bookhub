import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchResource } from "./DBAPI";

interface Forum {
  id: number;
  title: string;
  description: string;
}

export default function Forums() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  




  useEffect(() => {
    const loadForums = async () => {
      const data = await fetchResource("forums/popular");
      if (data) setForums(data);
      setLoading(false);
    };

    loadForums();
  }, []);

  return (
    <div className="forums-container">
      <h2>פורומים פתוחים לדיון</h2>
      {loading ? (
        <p>טוען פורומים...</p>
      ) : forums.length > 0 ? (
        <ul>
          {forums.map((forum) => (
            <li key={forum.id}>
              <Link to={`/forums/${forum.id}`}>
                <h3>{forum.title}</h3>
                <p>{forum.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        
      ) : (
        <p>לא נמצאו פורומים.</p>
      )}
    </div>
  );
}
