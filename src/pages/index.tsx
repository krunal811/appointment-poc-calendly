import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { Entry } from '../types/Entry';
import { fetchEntries } from '../utils/api';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/user.module.scss';

const Home = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  useEffect(() => {
    fetchEntries().then(setEntries);
  }, []);

  return (
    <>
      <Head>
        <title>Appointment Booking</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className={styles.userBg}>
        <div className={styles.userContainer}>
          {/* Topbar/Header */}
          <div className={styles.userHeaderRow}>
            <div className={styles.userHeader}>
              <img src="/dept-logo.svg" alt="Logo" style={{ height: 40, marginRight: 16 }} />
              <h1 className={styles.userTitle}>Select Your Appointment</h1>
            </div>
            <div className={styles.userHeaderActions}>
              <button
                className={`${styles.userBtn} ${viewMode === 'card' ? styles.active : ''}`}
                onClick={() => setViewMode('card')}
                type="button"
              >
                Card View
              </button>
              <button
                className={`${styles.userBtn} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
                type="button"
              >
                List View
              </button>
              {/* <Link href="/admin" className={styles.userAdminBtn}>
                Admin Dashboard
              </Link> */}
            </div>
          </div>
          {/* Content */}
          {entries.length === 0 ? (
            <div className={styles.userNoEntries}>
              No appointments found.
            </div>
          ) : viewMode === 'card' ? (
            <div className={styles.userCardGrid}>
              {entries.map((entry, index) => (
                <UserCard key={index} entry={entry} />
              ))}
            </div>
          ) : (
            <div className={styles.userTableWrapper}>
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Calendar Link</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={entry.image || '/favicon.svg'}
                          alt={entry.name}
                        />
                      </td>
                      <td>{entry.name}</td>
                      <td>{entry.description}</td>
                      <td>
                        <div className={styles.userBtnWrapper}>
                          <Link
                            href={entry.calendarLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.userBtn}
                          >
                            Book appointment
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <footer style={{
          textAlign: 'center',
          padding: '18px 0',
          color: '#64748b',
          fontSize: 16,
          background: '#f1f5f9',
          marginTop: 32
        }}>
          <a
            href="https://www.deptagency.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 500 }}
          >
            Developed by DEPT
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;