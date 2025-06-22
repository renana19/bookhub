import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoute";
import forums from "./routes/forums";
import { login } from "./controller/userController";
import postRoutes from "./routes/postRoutes";

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
app.use("/books", userRoutes);
app.use("/posts", postRoutes);

app.use("/notifications", userRoutes);
app.use("/comments", userRoutes);
app.use("/follows", userRoutes);
app.use("/forums", forums);

app.use("/favorites", userRoutes);
app.use("/search", userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
