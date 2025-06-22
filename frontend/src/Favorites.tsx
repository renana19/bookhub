import { useEffect, useState, useContext } from "react";
import { userContext } from "./App";

interface FavoriteItem {
  id: number;
  title: string;
  author: string;
  description?: string;
  coverImageUrl?: string;
}

function FavoritesPage() {
  const { contextUser } = useContext(userContext);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contextUser) return;

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${contextUser.id}/favorites`);
        if (!response.ok) throw new Error("Failed to fetch favorites");
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [contextUser]);

  if (!contextUser) {
    return <p>עליך להתחבר כדי לצפות במועדפים שלך.</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>המועדפים שלי</h2>

      {loading ? (
        <p>טוען...</p>
      ) : favorites.length === 0 ? (
        <p>לא סימנת עדיין ספרים או פוסטים בלייק.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {favorites.map((item) => (
            <li key={item.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              {item.coverImageUrl && (
                <img src={item.coverImageUrl} alt={item.title} style={{ width: "80px", marginRight: "1rem" }} />
              )}
              <div>
                <strong>{item.title}</strong> מאת {item.author}
                {item.description && <p>{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
