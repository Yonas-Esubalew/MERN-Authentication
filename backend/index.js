import express from "express";
import { connectDB } from "./Database/connectDB.js";
import authRoutes from "../backend/routes/authRoutes.js"
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json()); //allows the data is parse to the json format

const PORT = process.env.PORT || 5000;

app.use("/api/user", authRoutes)
app.listen(PORT, () => {
  connectDB();
  console.log(`this server is running on ${PORT}👨‍💻`);
});
