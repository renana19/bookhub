import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoute";
import { login } from "./controller/userController";

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
// app.use("/books", userRoutes);
// app.use("/authors", userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
