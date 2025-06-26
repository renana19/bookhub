import { useRef, useState, useContext } from "react";
// import "./css/LogIn.css";
import "./css/Login.css";
import { addResource } from "./DBAPI";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./App";

function Login() {
  const { contextUser, setcontextUser } = useContext(userContext); // שליפת המשתמש ויכולת לעדכן אותו

  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור שם משתמש
  const passwordRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור סיסמה
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // מונע רענון של הדף בעת שליחת הטופס
    if (!usernameRef.current || !passwordRef.current) return;

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    // const response = await UserExist(username, password)
    const response = await addResource("login", {
      username: username,
      password: password,
    });
    if (response != null) {
      setMessage("ההתחברות הצליחה!");

      const userData = response.user;
      console.log("User data received:", userData);

      // עדכון המשתמש בהקשר
      setcontextUser(userData);
      navigate("/"); // ניווט לעמוד הבית
    } else {
      setMessage("שם משתמש או סיסמה לא נכונים");
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          id="username"
          name="username"
          ref={usernameRef}
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          ref={passwordRef}
          required
        />

        <button type="submit">Log in</button>
        <p style={{ color: "blue" }}>{message}</p>
      </form>
      <p>
        אין לך חשבון? <Link to="/register">הירשם כאן</Link>
      </p>
    </div>
  );
}
export default Login;
