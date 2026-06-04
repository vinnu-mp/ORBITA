import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import User from "./models/user.model.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes-----------------------------------------

//Importing Routes
import userRoutes from "./routes/user.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import newsRoutes from "./routes/news.routes.js";
import apodRouter from "./routes/apod.routes.js";
import launchesRouter from "./routes/launches.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import profileRoutes from "./routes/profile.routes.js";

//Routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/apod", apodRouter);
app.use("/api/v1/launches", launchesRouter);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/bookmarks", bookmarkRoutes);
app.use("/api/v1/profile", profileRoutes);

//-----------------------------------------------
//Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

export default app;
