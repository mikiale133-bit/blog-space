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

/*{
  origin: "http://localhost:5173", /*"https://mkblog-space.vercel.app",
  credentials: true,
}*/
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/posts", postsRouter);
app.use("/api/users", userRouter);

// error middleware
app.use(errHanler);
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
