import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(), 'data', 'entries.json');

function readEntries() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeEntries(entries: any) {
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const entries = readEntries();
    res.status(200).json(entries);
  } else if (req.method === 'POST') {
    const entries = readEntries();
    entries.push(req.body);
    writeEntries(entries);
    res.status(201).json({ message: 'Entry added' });
  } else if (req.method === 'PUT') {
    // expects { index, entry }
    const { index, entry } = req.body;
    const entries = readEntries();
    entries[index] = entry;
    writeEntries(entries);
    res.status(200).json({ message: 'Entry updated' });
  } else if (req.method === 'DELETE') {
    // expects { index }
    const { index } = req.body;
    const entries = readEntries();
    entries.splice(index, 1);
    writeEntries(entries);
    res.status(200).json({ message: 'Entry deleted' });
  } else {
    res.status(405).end();
  }
}