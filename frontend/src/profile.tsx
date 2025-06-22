import { useContext, useState } from "react";
import { userContext } from "./App";
import "../css/UserProfile.css";

export default function UserProfile() {
  const { contextUser, setcontextUser } = useContext(userContext);

  // נעתיק את הנתונים כדי לעבוד עליהם בטופס
  const [name, setName] = useState(contextUser?.name || "");
  const [email, setEmail] = useState(contextUser?.email || "");
  const [profileImage, setProfileImage] = useState(contextUser?.profileImage || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // כאן את יכולה לקרוא ל־API צד שרת לעדכון המשתמש
    const updatedUser = { ...contextUser, name, email, profileImage };
    setcontextUser(updatedUser);
    alert("הפרטים עודכנו בהצלחה!");
  };

  if (!contextUser) {
    return <p style={{ padding: "2rem" }}>🛑 יש להתחבר כדי לצפות בפרופיל.</p>;
  }

  return (
    <div className="user-profile">
      <h2>👤 פרופיל המשתמש</h2>

      <div className="profile-info">
        <img
          src={profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="profile-image"
        />
        <p><strong>שם נוכחי:</strong> {contextUser.name}</p>
        <p><strong>אימייל נוכחי:</strong> {contextUser.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          שם:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          אימייל:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          קישור לתמונה:
          <input
            type="text"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />
        </label>

        <button type="submit">עדכן פרטים</button>
      </form>
    </div>
  );
}
