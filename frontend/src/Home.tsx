import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./App";
import "./css/Home.css";

interface Forum {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [forums, setForums] = useState<Forum[]>([]);
  const { contextUser } = useContext(userContext);

  useEffect(() => {
    // קריאת פורומים מהשרת
       const fetchUserForums = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/forums/popular`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setForums(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

     fetchUserForums();

  }, []);

  return (
    <div className="home-container">
      <div className="home-title">ברוכים הבאים ל־BookHub 📚</div>
      <div className="home-subtitle">
        {contextUser ? (
          <>שמח לראות אותך שוב, {contextUser.username}!</>
        ) : (
          <>
            <Link to="/login">התחבר/י</Link> כדי לפרסם פוסטים, לעקוב ולהגיב.
          </>
        )}
      </div>

      <div className="home-forums">
        <h3>פורומים פופולריים</h3>
        {/* כאן אפשר למפות פורומים */}
        <ul>
          <li><Link to="/forums/1">פורום ספרות קלאסית</Link></li>
          <li><Link to="/forums/2">פורום ספרי מתח</Link></li>
        </ul>
      </div>
    </div>
  );
}
