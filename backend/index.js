import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"
dotenv.config();

import { connectDB } from "./Database/connectDB.js";
import authRoutes from "../backend/routes/authRoutes.js"

const __dirname = path.resolve();
const app = express();

app.use(cors({origin: "https://mern-authentication-1-1q3e.onrender.com", credentials: true
}))
app.use(cookieParser());
app.use(express.json()); //allows the data is parse to the json format

const PORT = process.env.PORT || 8080;
app.use("/api/user", authRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connectDB();
  console.log(`This server is running on ${PORT}👨‍💻`);
});

