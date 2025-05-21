import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import styles from '../styles/admin.module.scss';

const DashboardSidebar = () => (
  <aside className={styles.dashboardSidebar}>
    <img 
        src="/favicon.svg"
        alt="Logo"
        className={styles.logo}
        style={{ maxWidth: 100, maxHeight: 100, borderRadius: 8, marginBottom: 8, objectFit: 'cover', background:"white", padding:10 }} />
    <h2>Admin Dashboard</h2>
    <nav>
      <Link href="/admin" className={styles.sidebarLink}>Manage Entries</Link>
      <Link href="/" className={styles.sidebarLink}>User View</Link>
    </nav>
  </aside>
);

export default DashboardSidebar;