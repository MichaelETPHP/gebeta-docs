import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/gebeta-cloud', (req, res) => {
  res.sendFile(path.join(__dirname, 'gebeta-cloud.html'));
});

app.get('/lms', (req, res) => {
  res.sendFile(path.join(__dirname, 'lms.html'));
});

app.get('/gotera', (req, res) => {
  res.sendFile(path.join(__dirname, 'gotera.html'));
});

app.listen(PORT, () => {
  console.log(`Documentation portal running at http://localhost:${PORT}`);
});
