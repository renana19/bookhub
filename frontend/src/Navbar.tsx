import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./App";
import "./css/Navbar.css";

export default function Navbar() {
  const { contextUser, setcontextUser } = useContext(userContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    setcontextUser(null);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-left">
        <Link to="/" onClick={() => setMenuOpen(false)}>📖 BookHub</Link>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/search" onClick={() => setMenuOpen(false)}>🔍 חיפוש</Link>
        <Link to="/forums" onClick={() => setMenuOpen(false)}>💬 פורומים</Link>
        <Link to="/books" onClick={() => setMenuOpen(false)}>📚 ספרים</Link>
        {contextUser && (
          <Link to="/userProfile" onClick={() => setMenuOpen(false)}>👤 איזור אישי</Link>
        )}
        {contextUser ? (
          <>
            <span>שלום, {contextUser.username}</span>
            <button onClick={handleLogout}>🚪 התנתק</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>🔑 התחברות</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>📝 הרשמה</Link>
          </>
        )}
      </div>
    </nav>
  );
}
