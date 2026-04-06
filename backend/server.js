import express from "express";
import postsRouter from "./routes/postsRoute.js";
import userRouter from "./routes/usersRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { errHanler } from "./middleware/errorMiddleware.js";

// frontend - backend connection
// import path from "path";
// import { pathToFileURL } from "url";

// const __filename =

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "https://mkblog-space.vercel.app",
    credentials: true,
  }),
);

app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/posts", postsRouter);
app.use("/api/users", userRouter);

// error middleware
app.use(errHanler);
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
