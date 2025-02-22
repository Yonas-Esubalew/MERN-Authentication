import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import { connectDB } from "./Database/connectDB.js";
import authRoutes from "../backend/routes/authRoutes.js"


const app = express();
app.use(cookieParser());
app.use(express.json()); //allows the data is parse to the json format

const PORT = process.env.PORT || 5000;

app.use("/api/user", authRoutes)

app.listen(PORT, () => {
  connectDB();
  console.log(`this server is running on ${PORT}👨‍💻`);
});
