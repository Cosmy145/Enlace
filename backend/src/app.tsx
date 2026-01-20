import express from "express";
import { createServer } from "node:http";
import { connectToSocket } from "./controllers/socketManager.js";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";
import geocodeRoutes from "./routes/geocode.routes.js";
config(); // Load environment variables from .env file

const app = express(); // Initialize express
const server = createServer(app); // Create server ...usually app.listen creates this server by itself, but
// socket.io needs raw node.js http server to attach itself to.
const io = connectToSocket(server); // Initialize socket.io

app.set("port", process.env.PORT || 3000); //this is sorta like local storage.

// Configure CORS to allow frontend requests
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Use cookie parser for JWT cookies
app.use(cookieParser());

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/otp", otpRoutes);
app.use("/api/v1/meeting", meetingRoutes);
app.use("/api/v1/geocode", geocodeRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(app.get("port"), async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined in the environment variables");
  }
  const connectDB = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDB connected: ${connectDB.connection.host}`);

  console.log(`Example app listening on port ${app.get("port")}`);
});
