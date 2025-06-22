import { useEffect, useState, useContext } from "react";
import { userContext } from "./App";

interface User {
  id: number;
  name: string;
}

export default function Folowers() {
  const { contextUser } = useContext(userContext);
  const [followers, setFollowers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contextUser) return;

    fetch(`http://localhost:8080/users/${contextUser.id}/followers`)
      .then(res => res.json())
      .then(data => setFollowers(data))
      .catch(err => console.error("שגיאה בטעינת העוקבים:", err))
      .finally(() => setLoading(false));
  }, [contextUser]);

  if (!contextUser) {
    return <p>יש להתחבר כדי לראות את העוקבים שלך.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👥 העוקבים שלי</h2>
      {loading ? (
        <p>טוען...</p>
      ) : followers.length === 0 ? (
        <p>אין לך עוקבים כרגע.</p>
      ) : (
        <ul>
          {followers.map((f) => (
            <li key={f.id}>{f.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
