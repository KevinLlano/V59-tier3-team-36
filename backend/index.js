import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database.js";
import roleRoutes from "./routes/RoleRoute.js";
import questionRoutes from "./routes/questionRoutes.js";

// Creating express object
const app = express();

// Load environment variables
dotenv.config();

// Port Number
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

app.use(express.json());

// Route mount
app.use("/api/roles", roleRoutes);
app.use("/api/questions", questionRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("A simple Node App is " + "running on this server");
  res.end();
});

const startServer = async () => {
  await connectDB();

  // Server Setup
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
};

startServer();
