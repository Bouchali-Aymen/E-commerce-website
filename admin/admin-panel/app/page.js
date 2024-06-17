import Admin from '@/pages/admin';
import LeftBar from './components/LeftBar/LeftBar';
import './normalize.css'




import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Admin/>    
    </main>
  );
}
