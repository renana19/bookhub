import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import Navbar from "./Navbar";

// 🔁 עמודים ציבוריים
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Forums from "./Forums";
import Forum from "./Forum";
import Post from "./Post";
import SearchPage from "./SearchPage";
import Books from "./Books"; // עמוד ספרים
import Book from "./Book"; // עמוד ספר בודד

// 🔐 עמודים מוגנים

import NewPost from "./NewPost";
import NewComment from "./NewComment";

import UserProfile from "./UserProfile";

import Favorites from "./Favorites";
import Notifications from "./Notifications";
import Followers from "./Followers";
import Following from "./Following";

// 🔒 רכיב הגנה
import PrivateRoute from "./PrivateRoute";

// 🧠 הקשר משתמש
export const userContext = createContext<any>(null);

function App() {
  const [contextUser, setcontextUser] = useState(() => {
    const savedUser = localStorage.getItem("contextUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (contextUser) {
      localStorage.setItem("contextUser", JSON.stringify(contextUser));
    } else {
      localStorage.removeItem("contextUser");
    }
  }, [contextUser]);

  return (
    <userContext.Provider value={{ contextUser, setcontextUser }}>
      <Navbar />
      <Routes>
        {/* 🌍 עמודים פתוחים */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forums" element={<Forums />} />
         <Route path="/forums/:id" element={<Forum />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<Book />} />
       
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />

        {/* 🔐 עמודים שמחייבים התחברות */}

        <Route
          path="/forums/:id/newPost"
          element={
            <PrivateRoute>
              <NewPost />
            </PrivateRoute>
          }
        />

        <Route
          path="/posts/:id/newComment"
          element={
            <PrivateRoute>
              <NewComment />
            </PrivateRoute>
          }
        />

        <Route
          path="/userprofile/:userId"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />

        {/* 🧭 דף שגיאה */}
        <Route path="*" element={<h2>404 - הדף לא נמצא</h2>} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
