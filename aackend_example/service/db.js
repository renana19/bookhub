import mysql from "mysql2/promise";
import dotenv from "dotenv";

// טוען את משתני הסביבה מקובץ .env
dotenv.config();
// יוצר מאגר חיבורים למסד הנתונים
const pool = mysql
  .createPool({
    host: process.env.DB_HOST, // כתובת השרת – לרוב localhost
    user: process.env.DB_USER, // המשתמש שלך ב־MySQL (לרוב root)
    password: process.env.DB_PASS, // הסיסמה שלך (למשל Allfrom5!)
    database: process.env.DB_NAME, // שם המסד (למשל bookhub)
    waitForConnections: true,
    connectionLimit: 10, // מספר חיבורים מקסימלי
    queueLimit: 0,
  })
  .promise();

export default pool;
