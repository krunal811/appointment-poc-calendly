const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000; // Or any port you like

const DATA_FILE = path.join(__dirname, 'data', 'entries.json');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // <-- Add this line
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// Helper functions
function readEntries() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeEntries(entries) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

// GET all entries
app.get('/api/entries', (req, res) => {
  const entries = readEntries();
  res.json(entries);
});

// ADD new entry
app.post('/api/entries', (req, res) => {
  const entries = readEntries();
  entries.push(req.body);
  writeEntries(entries);
  res.status(201).json({ message: 'Entry added' });
});

// UPDATE entry by index
app.put('/api/entries/:index', (req, res) => {
  const entries = readEntries();
  const idx = parseInt(req.params.index, 10);
  if (idx < 0 || idx >= entries.length) {
    return res.status(404).json({ message: 'Entry not found' });
  }
  entries[idx] = req.body;
  writeEntries(entries);
  res.json({ message: 'Entry updated' });
});

// DELETE entry by index
app.delete('/api/entries/:index', (req, res) => {
  const entries = readEntries();
  const idx = parseInt(req.params.index, 10);
  if (idx < 0 || idx >= entries.length) {
    return res.status(404).json({ message: 'Entry not found' });
  }
  entries.splice(idx, 1);
  writeEntries(entries);
  res.json({ message: 'Entry deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});