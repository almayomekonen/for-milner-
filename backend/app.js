const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const fs = require("fs");

const userRoutes = require("./router/user-routes");
const postRoutes = require("./router/post-routes");

const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads");
const profilesDir = path.join(uploadDir, "profiles");
const postsDir = path.join(uploadDir, "posts");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

if (!fs.existsSync(profilesDir)) {
  fs.mkdirSync(profilesDir);
}

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 4000;

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.26zhx4l.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => {
    console.log("Connected to mongoDB");
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch(() => console.error("mongoDB connection error"));
