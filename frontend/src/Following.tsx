import { useEffect, useState, useContext } from "react";
import { userContext } from "./App";

interface User {
  id: number;
  name: string;
}

export default function Following() {
  const { contextUser } = useContext(userContext);
  const [following, setFollowing] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contextUser) return;

    fetch(`http://localhost:8080/users/${contextUser.id}/following`)
      .then(res => res.json())
      .then(data => setFollowing(data))
      .catch(err => console.error("שגיאה בטעינת המשתמשים שאתה עוקב אחריהם:", err))
      .finally(() => setLoading(false));
  }, [contextUser]);

  if (!contextUser) {
    return <p>יש להתחבר כדי לראות את מי שאתה עוקב אחריו.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👣 המשתמשים שאני עוקב אחריהם</h2>
      {loading ? (
        <p>טוען...</p>
      ) : following.length === 0 ? (
        <p>אתה לא עוקב אחרי אף אחד כרגע.</p>
      ) : (
        <ul>
          {following.map((f) => (
            <li key={f.id}>{f.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
