require("dotenv").config();

const express   = require("express");
const cors      = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

// ── CORS: allow your Vercel frontend + localhost ──────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://team-square-one.vercel.app",
  // Add any other Vercel preview URLs here
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limit: 200 req per 15 min per IP
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// ── Routes ──────────────────────────────────────────────────
app.use("/api/auth",       require("./routes/authRoutes"));
app.use("/api/prediction", require("./routes/predictionRoutes"));
app.use("/api/finance",    require("./routes/financeRoutes"));
app.use("/api/zones",      require("./routes/zoneRoutes"));
app.use("/api/community",  require("./routes/communityRoutes"));
app.use("/api/legal",      require("./routes/legalRoutes"));

// Health check — Render uses this to confirm the service is up
app.get("/api/health", (_, res) =>
  res.json({ success: true, message: "vikreta vikas API running ", env: process.env.NODE_ENV })
);

// 404
app.all("*", (req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` })
);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Vikreta Vikas API on port ${PORT}`);
  console.log(` Health: http://localhost:${PORT}/api/health`);
});
