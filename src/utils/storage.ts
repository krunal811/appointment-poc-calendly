// import { Entry } from '../types/Entry';

// const STORAGE_KEY = 'entries';

// export const saveEntries = (entries: Entry[]) => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
// };

// export const getEntries = (): Entry[] => {
//     const entries = localStorage.getItem(STORAGE_KEY);
//     try {
//         const parsed: Entry[] = entries ? JSON.parse(entries) : [];
//         // Ensure all entries have the new image property (for backward compatibility)
//         return parsed.map(entry => ({
//             ...entry,
//             image: entry.image || "",
//         }));
//     } catch {
//         return [];
//     }
// };

// // export const clearEntries = () => {
// //     localStorage.removeItem(STORAGE_KEY);
// // };