import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoute";
import { login } from "./controller/userController";
import postRoutes from "./routes/postRoutes";
import bookRoutes from "./routes/bookRoute";
import commentsRoute from "./routes/commentRoute";
import forumRoutes from "./routes/forumRoute";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/login", login);
app.get("/", (req: Request, res: Response) => {
  let time: string = new Date().toLocaleTimeString();
  let str: string = `Hello world! The time is ${time}`;
  res.send(str);
});

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/posts", postRoutes);

// app.use("/notifications", userRoutes);
app.use("/comments", commentsRoute);
// app.use("/follows", userRoutes);
app.use("/forums", forumRoutes);

// app.use("/favorites", userRoutes);
// app.use("/search", userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
