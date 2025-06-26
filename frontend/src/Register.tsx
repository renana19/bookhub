import { useRef, useState } from 'react';
import "./css/Login.css";

import { Link, useNavigate } from "react-router-dom";
import { fetchResource } from './DBAPI';

function Register() {
    const usernameRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור שם משתמש
    const passwordRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור סיסמה
    const varifyPasswordRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור סיסמה
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState("");
     const navigate = useNavigate();  // הכיני את הפונקציה לניווט

const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // מונע רענון של הדף בעת שליחת הטופס
        if (!usernameRef.current || !passwordRef.current || !varifyPasswordRef.current) {
            setMessage("Please fill in all fields.");
            return;
        }
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const verifyPassword = varifyPasswordRef.current.value;

        // בדיקת תקינות: האם הסיסמאות תואמות
        if (password !== verifyPassword) {
            setMessage("Passwords do not match. Please try again.");
            return; // יוצא מהפונקציה אם הסיסמאות לא תואמות
        }

        //http://localhost:3000/ וכן רק נקרא לובגנרית נממש את החיפוש על
        const response = await fetchResource("users/username",{username})
        console.log(response);
        if (!response) {
            setMessage("user exists please log in");
            navigate("/login");  // פה את מפנה לעמוד הלוגין
        }
        else {
            setMessage("Great! go complete registration");
            

        }
    };
return (
        <div>
            <form onSubmit={handleRegister}>
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
                <input
                    type="password"
                    id="varifyPassword"
                    name="varifyPassword"
                    ref={varifyPasswordRef}
                    required
                />

                <button type="submit">Register</button>
                <p>{message}</p>

                
            </form>
             {redirect && (
                <Link to="/FinishRegistration" state={{ username: usernameRef.current?.value, password: passwordRef.current?.value }}>
                    Go to Finish Registration
                </Link>

            )}
        </div>
)
}
export default Register;