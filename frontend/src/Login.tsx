import { useRef, useState, useContext } from "react";
// import "./css/LogIn.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור שם משתמש
  const passwordRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור סיסמה
  const [message, setMessage] = useState("");
  //   const handleLogin = async (e: any) => {
  //     e.preventDefault(); // מונע רענון של הדף בעת שליחת הטופס
  //     const username = usernameRef.current!.value;
  //     const password = passwordRef.current!.value;

  return (
    <div>
      <form>
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
        <p>{message}</p>
      </form>
      <p>
        אין לך חשבון? <Link to="/register">הירשם כאן</Link>
      </p>
    </div>
  );
}
export default Login;
