const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const destinationRoutes = require("./routes/destinationRoutes");

dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
app.set("trust proxy", 1);
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const requestCounts = new Map();

app.disable("x-powered-by");
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "100kb" }));
app.use((req, res, next) => {
  const now = Date.now();
  const windowStart = now - 60_000;
  const requests = (requestCounts.get(req.ip) || []).filter(
    (timestamp) => timestamp > windowStart
  );

  if (requests.length >= 120) {
    return res.status(429).json({ message: "Too many requests" });
  }

  requests.push(now);
  requestCounts.set(req.ip, requests);
  next();
});

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: "ok",
    database: connected ? "connected" : "disconnected",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Tourism API is running",
  });
});

app.use("/api/destinations", destinationRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && error.body) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }

  console.error(error);
  res.status(error.status || 500).json({
    message: error.status ? error.message : "Internal server error",
  });
});

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required");
  }

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10_000,
  });

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received, shutting down`);
    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  };

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
}

startServer().catch((error) => {
  console.error(`Startup failed: ${error.message}`);
  process.exitCode = 1;
});