import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/gebeta-cloud", (req, res) => {
  res.sendFile(path.join(__dirname, "gebeta-cloud.html"));
});

app.get("/lms", (req, res) => {
  res.sendFile(path.join(__dirname, "lms.html"));
});

app.get("/gotera", (req, res) => {
  res.sendFile(path.join(__dirname, "gotera.html"));
});

app.get("/bahiran-ride", (req, res) => {
  res.sendFile(path.join(__dirname, "bahiran-ride.html"));
});

app.get("/taxiapp", (req, res) => {
  res.sendFile(path.join(__dirname, "taxiapp.html"));
});

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Gebeta Docs running on port ${PORT}`);
});
