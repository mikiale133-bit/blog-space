import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { errHanler } from "./middleware/errorMiddleware.js";

// routes
import postsRouter from "./routes/postsRoute.js";
import userRouter from "./routes/usersRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import likesRouter from "./routes/likes.js";
import commentsRouter from "./routes/comments.js";
import followsRouter from "./routes/follows.js";

// configs
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/posts", postsRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRoutes);
app.use("/api/likes", likesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/follows", followsRouter);

// error middleware
app.use(errHanler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
