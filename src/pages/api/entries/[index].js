import { readEntries, writeEntries } from './helpers';

export default function handler(req, res) {
  const idx = parseInt(req.query.index, 10);
  const entries = readEntries();

  if (req.method === 'PUT') {
    if (idx < 0 || idx >= entries.length) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    entries[idx] = req.body;
    writeEntries(entries);
    res.json({ message: 'Entry updated' });
  } else if (req.method === 'DELETE') {
    if (idx < 0 || idx >= entries.length) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    entries.splice(idx, 1);
    writeEntries(entries);
    res.json({ message: 'Entry deleted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}