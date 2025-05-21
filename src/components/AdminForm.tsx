import React, { useState, useEffect, useRef } from 'react';
import { Entry } from '../types/Entry';
import styles from '../styles/adminForm.module.scss';

interface AdminFormProps {
  onAddEntry: (entry: Entry) => void;
  initialEntry?: Entry;
  isEditing: boolean;
  onCancelEdit: () => void;
}

const defaultEntry: Entry = { name: '', calendarLink: '', description: '', image: '' };

const AdminForm: React.FC<AdminFormProps> = ({ onAddEntry, initialEntry, isEditing, onCancelEdit }) => {
  const [entry, setEntry] = useState<Entry>(defaultEntry);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialEntry) setEntry(initialEntry);
    else setEntry(defaultEntry);
  }, [initialEntry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  // Only update image if a new file is selected
  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEntry(prev => ({ ...prev, image: reader.result as string }));
    };
    console.log('====================================');
    console.log(file);
    console.log('====================================');
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.name || !entry.calendarLink) return;
    onAddEntry(entry);
    setEntry(defaultEntry);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.adminForm}>
      <input
        name="name"
        placeholder="Name"
        value={entry.name}
        onChange={handleChange}
        required
        className={styles.adminForm__input}
      />
      <input
        name="calendarLink"
        placeholder="Calendar Link"
        value={entry.calendarLink}
        onChange={handleChange}
        required
        className={styles.adminForm__input}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={entry.description}
        onChange={handleChange}
        className={styles.adminForm__textarea}
      />
      <div
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
        onDrop={handleDrop}
        className={`${styles['adminForm__dropzone']} ${dragActive ? styles['adminForm__dropzone--active'] : ''}`}
        onClick={() => inputRef.current?.click()}
      >
        {entry.image ? (
          <img src={entry.image} alt="Preview" className={styles['adminForm__image-preview']} />
        ) : (
          <span>Drag & drop image here, or click to select</span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      <div className={styles.adminForm__actions}>
        <button type="submit" className={`${styles['adminForm__button']} ${styles['adminForm__button--add']}`}>
          {isEditing ? 'Update' : 'Add'}
        </button>
        {isEditing && (
          <button
            type="button"
            className={`${styles['adminForm__button']} ${styles['adminForm__button--cancel']}`}
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AdminForm;