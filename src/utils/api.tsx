import { Entry } from '../types/Entry';

const API_URL = '/api/entries';

export const fetchEntries = async (): Promise<Entry[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addEntry = async (entry: Entry) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return res.json();
};

export const updateEntry = async (index: number, entry: Entry) => {
  const res = await fetch(`${API_URL}/[${index}]`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return res.json();
};

export const deleteEntry = async (index: number) => {
  const res = await fetch(`${API_URL}/[${index}]`, {
    method: 'DELETE',
  });
  return res.json();
};