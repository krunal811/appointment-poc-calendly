import React from 'react';
import { Entry } from '../types/Entry';
import Link from 'next/link';
import styles from '../styles/userCard.module.scss';

const UserCard: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div className={styles.userCard}>
      <img
        src={entry.image || '/favicon.svg'}
        alt={entry.name}
        className={styles.userCardImage}
      />
      <h2 className={styles.userCardTitle}>{entry.name}</h2>
      <p className={styles.userCardDesc}>{entry.description}</p>
      <Link
        href={entry.calendarLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.userCardBtn}
      >
        Book appointment
      </Link>
    </div>
  );
};

export default UserCard;