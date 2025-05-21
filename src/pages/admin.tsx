import React, { useState, useEffect } from 'react';
import AdminForm from '../components/AdminForm';
import DashboardSidebar from '../components/DashboardSidebar';
import EntryCard from '../components/EntryCard';
import { Entry } from '../types/Entry';
import { fetchEntries, addEntry, updateEntry, deleteEntry } from '../utils/api';
import styles from '../styles/admin.module.scss';
import Head from 'next/head';

const Admin: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  useEffect(() => {
    fetchEntries().then(setEntries);
  }, []);

  const handleAddEntry = async (entry: Entry) => {
    if (editingIndex !== null) {
      await updateEntry(editingIndex, entry);
      const updated = [...entries];
      updated[editingIndex] = entry;
      setEntries(updated);
      setEditingIndex(null);
    } else {
      await addEntry(entry);
      setEntries(await fetchEntries());
    }
  };

  const handleEdit = (index: number) => setEditingIndex(index);

  const handleRemove = async (index: number) => {
    await deleteEntry(index);
    setEntries(await fetchEntries());
    setEditingIndex(null);
  };

  return (
    
    <>
      <Head>
    <title>Admin Dashboard</title>
    <link rel="icon" href="/favicon.svg" />
  </Head>
    <div className={styles.dashboardContainer}>
      <DashboardSidebar />
      <main className={styles.dashboardMain}>
        <header className={styles.dashboardHeader}>Manage Appointments</header>
       
        <AdminForm
          onAddEntry={handleAddEntry}
          initialEntry={editingIndex !== null ? entries[editingIndex] : undefined}
          isEditing={editingIndex !== null}
          onCancelEdit={() => setEditingIndex(null)}
        />
        <h2 className={styles.entriesTitle}>Current Entries</h2>
         <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button
            onClick={() => setViewMode('card')}
            style={{
              marginRight: 8,
              padding: '6px 16px',
              borderRadius: 6,
              border: viewMode === 'card' ? '2px solid #000000' : '1px solid #cbd5e1',
              background: viewMode === 'card' ? '#000000' : '#f1f5f9',
              color: viewMode === 'card' ? '#fff' : '#000000',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: viewMode === 'list' ? '2px solid #000000' : '1px solid #cbd5e1',
              background: viewMode === 'list' ? '#000000' : '#f1f5f9',
              color: viewMode === 'list' ? '#fff' : '#000000',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            List View
          </button>
        </div>
        <div>
          {viewMode === 'card' ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {entries.map((entry, index) => (
                <EntryCard
                  key={index}
                  entry={entry}
                  onEdit={() => handleEdit(index)}
                  onRemove={() => handleRemove(index)}
                />
              ))}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8 }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #e5e7eb' }}>Image</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #e5e7eb' }}>Description</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #e5e7eb' }}>Calendar Link</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td style={{ padding: 8, textAlign: 'center' }}>
                      <img
                          src={entry.image || '/favicon.svg'}
                          alt={entry.name}
                          style={{ maxWidth: 60, maxHeight: 60, borderRadius: 6, objectFit: 'cover' }}
                        />
                    </td>
                    <td style={{ padding: 8 }}>{entry.name}</td>
                    <td style={{ padding: 8 }}>{entry.description}</td>
                    <td style={{ padding: 8 }}>
                      <a href={entry.calendarLink} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'underline' }}>
                        {entry.calendarLink}
                      </a>
                    </td>
                    <td style={{ padding: 8 }}>
                      <button onClick={() => handleEdit(index)} style={{ marginRight: 8, background: '#fde68a', color: '#92400e', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>
                        Edit
                      </button>
                      <button onClick={() => handleRemove(index)} style={{ background: '#f87171', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
    </>
  );
};

export default Admin;