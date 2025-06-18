import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config();

//Import routes (commented out for now, as they are not defined in this snippet
import usersRoutes from "./routes/users.js";
import forumsRoutes from "./routes/forums.js";
import commentsRoutes from "./routes/comments.js";
import booksRoutes from "./routes/books.js";
import ratingsRoutes from "./routes/ratings.js";
import followsRoutes from "./routes/follows.js";

// __dirname workaround for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
//router.put("/verify/:id", verifyToken, isAdmin, setVerifiedStatus);

app.use("/users", usersRoutes);
app.use("/forums", forumsRoutes);
app.use("/comments", commentsRoutes);
app.use("/books", booksRoutes);
app.use("/ratings", ratingsRoutes);
app.use("/follows", followsRoutes);

// Path to frontend/dist
const staticPath = path.join(__dirname, "..", "frontend", "dist");

// Serve static files
app.use(express.static(staticPath));

// Handle client-side routing (like React Router)
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

export default app;
