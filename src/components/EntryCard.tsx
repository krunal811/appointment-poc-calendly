import { Edit, Trash2 } from 'lucide-react';
import styles from '../styles/admin.module.scss';
import { Entry } from '../types/Entry';

interface EntryCardProps {
  entry: Entry;
  onEdit: () => void;
  onRemove: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onEdit, onRemove }) => (
  <div className={styles.entryCard}>
    <img
        src={entry.image || '/favicon.svg'}
        alt={entry.name}
        className={styles.entryImage}
        style={{ maxWidth: 100, maxHeight: 100, borderRadius: 8, marginBottom: 8, objectFit: 'cover' }}
      />
    <div>
      <div className={styles.entryName}>{entry.name}</div>
      <div className={styles.entryDesc}>{entry.description}</div>
    </div>
    <a
      href={entry.calendarLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.entryLink}
    >
      {entry.calendarLink}
    </a>
    <div className={styles.entryActions}>
      <button
        onClick={onEdit}
        className={`${styles.iconBtn} ${styles.edit}`}
        title="Edit"
      >
        <Edit size={18} /> Edit
      </button>
      <button
        onClick={onRemove}
        className={`${styles.iconBtn} ${styles.remove}`}
        title="Remove"
      >
        <Trash2 size={18} /> Remove
      </button>
    </div>
  </div>
);

export default EntryCard;