import { useRef, useState } from 'react';
import "./css/Login.css";

import { Link } from "react-router-dom";
import { fetchResource } from './DBAPI';

function Register() {
    const usernameRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור שם משתמש
    const passwordRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור סיסמה
    const varifyPasswordRef = useRef<HTMLInputElement>(null); // הגדרת useRef עבור סיסמה
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState("");

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
        const response = await fetchResource("users",{username})
        console.log(response);
        if (response.length!=0) {
            setMessage("user exists please log in");
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
        </div>
)
}
export default Register;