import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Fix MIME types
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  }
  next();
});

// Serve HTML doc files
app.get("/docs/gebeta-cloud", (req, res) => {
  res.sendFile(path.join(__dirname, "gebeta-cloud.html"));
});

app.get("/docs/lms", (req, res) => {
  res.sendFile(path.join(__dirname, "lms.html"));
});

app.get("/docs/gotera", (req, res) => {
  res.sendFile(path.join(__dirname, "gotera.html"));
});

// Serve React app (portal)
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Gebeta Docs running on port ${PORT}`);
});